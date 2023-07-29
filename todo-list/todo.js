////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_task_container = document.getElementById('taskForm');
search_task_container = document.getElementById('taskFormSearch');
sort_task_container = document.getElementById('taskFormSort');
displayTask = document.getElementById('displayTask');
displaySearchSortTask = document.getElementById('displaySearchSortTask');

const add_task_checkbox = document.getElementById('add_task_toggle');
add_task_checkbox.addEventListener('change', function () {
  if (add_task_checkbox.checked) {
    console.log('Checkbox is checked.');
    add_task_container.style.display = 'block';
  } else {
    add_task_container.style.display = 'none';
    console.log('Checkbox is unchecked.');
  }
});

const search_task_checkbox = document.getElementById('search_task_toggle');
search_task_checkbox.addEventListener('change', function () {
  if (search_task_checkbox.checked) {
    console.log('Checkbox is checked.');
    search_task_container.style.display = 'block';
  } else {
    console.log('Checkbox is unchecked.');
    search_task_container.style.display = 'none';
  }
});

const sort_task_checkbox = document.getElementById('sort_task_toggle');
sort_task_checkbox.addEventListener('change', function () {
  if (sort_task_checkbox.checked) {
    console.log('Checkbox is checked.');
    sort_task_container.style.display = 'block';
  } else {
    console.log('Checkbox is unchecked.');
    sort_task_container.style.display = 'none';
  }
});

const display_task_checkbox = document.getElementById('display_task_toggle');
display_task_checkbox.addEventListener('change', function () {
  if (display_task_checkbox.checked) {
    console.log('Checkbox is checked.');
    displayTask.style.display = 'flex';
    displaySearchSortTask.style.display = 'flex';
  } else {
    console.log('Checkbox is unchecked.');
    displayTask.style.display = 'none';
    displaySearchSortTask.style.display = 'none';
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//general code to create new elements
function div_class_id_content(div_, class_, id_, content_) {
  element = document.createElement(div_);
  element.classList.add(class_);
  element.id = id_;
  element.innerText = content_;
  return element;
}

function deleteEleDOM(id, str) {
  removeEle = document.getElementById(str + id);
  removeEle.remove();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseTodoText(todoText) {
  // Regular expression to find dates in formats like "tomorrow", "tmo", "30th Nov", etc.
  const dateRegex = /(\b(?:tomorrow|tmo)\b|\b\d{1,2}(?:st|nd|rd|th)? (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b)/i;

  // Regular expression to find time in formats like "3 pm"
  const timeRegex = /(\b\d{1,2}(:\d{1,2})? (?:am|pm)\b)/i;

  // Extract date and time from todoText using the regular expressions
  const dateMatch = todoText.match(dateRegex);
  const timeMatch = todoText.match(timeRegex);

  let dueDate = null;

  if (dateMatch) {
    const currentDate = new Date();
    const dateStr = dateMatch[0].toLowerCase().trim();

    if (dateStr === 'tomorrow' || dateStr === 'tmo') {
      currentDate.setDate(currentDate.getDate() + 1);
      dueDate = currentDate;
    } else {
      const dayMonth = dateMatch[0].split(' ');
      const day = parseInt(dayMonth[0]);
      const month = dayMonth[1];
      const currentYear = currentDate.getFullYear();
      const dateWithYear = `${day} ${month} ${currentYear}`;
      // Convert the extracted date into a valid JavaScript Date object
      dueDate = new Date(dateWithYear);

      // Check if the due date has already passed for the current year
      if (dueDate < currentDate) {
        dueDate.setFullYear(currentYear + 1); // Increment the year to the next year
      }
    }
  }

  if (timeMatch && dueDate) {
    // Extract the time from the timeMatch and update the dueDate
    const timeParts = timeMatch[0].split(' ');
    const time = timeParts[0];
    const amPm = timeParts[1];

    const hours = parseInt(time.split(':')[0]);
    let minutes = 0;
    if (time.split(':').length > 1) {
      minutes = parseInt(time.split(':')[1]);
    }

    if (amPm.toLowerCase() === 'pm') {
      hours += 12;
    }

    dueDate.setHours(hours, minutes);
  }

  return dueDate;
}

// Code for text area
const textarea = document.getElementById('enter_task');
function resizeTextarea() {
  const maxRows = 6;
  textarea.rows = 1;
  const rowsToSet = Math.min(maxRows, textarea.scrollHeight / 20); // Adjust this value as needed for row height
  textarea.rows = rowsToSet;
  textarea.style.overflowY = rowsToSet > maxRows ? 'scroll' : 'hidden';
}
textarea.addEventListener('input', resizeTextarea);

//Default date and time
document.addEventListener('DOMContentLoaded', function () {
  const datePicker = document.getElementById('datePicker');
  const today = new Date().toISOString().slice(0, 10);
  datePicker.value = today;

  const timePicker = document.getElementById('timePicker');
  timePicker.value = '23:59';
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Tick is triggered when enter is pressed inside tag field
//Tags are appended to the tags text field
const tag_text = document.getElementById('tag_text');
const tag_button = document.getElementById('tag_button');
const tag_display = document.getElementsByClassName('tag_display')[0];
let tmp_tags = [];
let tmp_tags_id = 1;

function create_tag_bars(tag_content, tag_id) {
  const tag_bar = div_class_id_content('div', 'tag_bar', `tag_bar_${tag_id}`, '');
  const tag_bar_content = div_class_id_content('div', 'tag_bar_content', `tag_content_${tag_id}`, tag_content);
  const tag_bar_delete = div_class_id_content('div', 'tag_bar_delete', `tag_delete_${tag_id}`, 'x');

  tag_bar.appendChild(tag_bar_content);
  tag_bar.appendChild(tag_bar_delete);
  tag_display.appendChild(tag_bar);
}

function check_text_display() {
  if (tmp_tags.length != 0) {
    tag_display.firstChild.textContent = '';
    tag_display.style.alignItems = 'stretch';
    tag_display.style.justifyContent = 'flex-start';
  } else {
    tag_display.firstChild.textContent = 'The tags will appear here';
    tag_display.style.alignItems = 'center';
    tag_display.style.justifyContent = 'center';
  }
}

tag_button.addEventListener('click', function (event) {
  event.preventDefault();

  let tag_text_val = tag_text.value.replace(/ /g, '_');

  if (tag_text_val != '') {
    const id = tmp_tags_id;
    tag_text_val = `#${tag_text_val}`;
    tmp_tags.push({ 'id': id, 'content': tag_text_val });
    create_tag_bars(tag_text_val, id);
    const tag_bar_delete = document.getElementById(`tag_delete_${id}`);
    tag_bar_delete.addEventListener('click', function (event) {
      deleteEle(tmp_tags, id, 'tag_bar_');
      check_text_display();
    });
    tmp_tags_id++;
  }

  check_text_display();
  tag_text.value = '';
});

tag_text.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    tag_button.click();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let tmp_subtasks = [];
let tmp_subtasks_id = 1;

//Modal Code for subtasks
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = modal.querySelector('.close');
const doneBtn = modal.querySelector('.submit_subtasks');

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
doneBtn.addEventListener('click', function () { closeModal(); });

text_area_subtasks = document.getElementById('text_area_subtasks');
submit_subtask = document.getElementById('submit_subtask');
subtasks = document.getElementsByClassName('subtasks')[0];

function create_subtask_bars(subtask_content, subtask_id) {
  const subtask_bar = div_class_id_content('div', 'subtask_bar', `subtask_bar_${subtask_id}`, '');
  const subtask_bar_content = div_class_id_content('div', 'subtask_bar_content', `subtask_content_${subtask_id}`, subtask_content);
  const subtask_bar_edit = div_class_id_content('button', 'subtask_bar_edit', `subtask_edit_${subtask_id}`, 'Edit');
  const subtask_bar_delete = div_class_id_content('button', 'subtask_bar_delete', `subtask_delete_${subtask_id}`, 'Remove');

  subtask_bar.appendChild(subtask_bar_content);
  subtask_bar.appendChild(subtask_bar_edit);
  subtask_bar.appendChild(subtask_bar_delete);
  subtasks.appendChild(subtask_bar);
}

function editSubEle(tmp_subtasks, id) {
  subtask_content_ = document.getElementById(`subtask_content_${id}`);
  subtask_bar_edit = document.getElementById(`subtask_edit_${id}`);

  if (subtask_bar_edit.innerText == 'Edit') {
    subtask_bar_edit.innerText = 'Save';
    subtask_content_.style.background = 'rgba(47, 47, 47, 0.5)'
    subtask_content_.style.marginRight = '2px';
    subtask_content_.style.border = '2px solid white';
    subtask_content_.style.borderRadius = '5px';
  } else {
    subtask_bar_edit.innerText = 'Edit';
    subtask_content_.style.background = 'none';
    subtask_content_.style.marginRight = '0';
    subtask_content_.style.border = 'none';
    subtask_content_.style.borderRadius = 'none';

    for (let i = 0; i < tmp_subtasks.length; i++) {
      if (tmp_subtasks[i].id == id) {
        tmp_subtasks[i].content = subtask_content_.innerText;
      }
    }
  }
  subtask_content_.contentEditable = !subtask_content_.isContentEditable;
}

submit_subtask.addEventListener('click', function () {
  const subtask_string = text_area_subtasks.value;
  if (subtask_string != '') {
    const id = tmp_subtasks_id;
    tmp_subtasks.push({ 'id': id, 'content': subtask_string });
    create_subtask_bars(subtask_string, id);
    text_area_subtasks.value = '';

    subtask_bar_delete = document.getElementById(`subtask_delete_${id}`);
    subtask_bar_delete.addEventListener('click', function (event) {
      deleteEle(tmp_subtasks, id, 'subtask_bar_');
    });

    subtask_bar_edit = document.getElementById(`subtask_edit_${id}`);
    subtask_bar_edit.addEventListener('click', function (event) {
      editSubEle(tmp_subtasks, id);
    });

    tmp_subtasks_id++;
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// let tmp_subtasks = [];
// let tmp_subtasks_id = 1;

// //Modal Code for subtasks
// const openModalBtn = document.getElementById('openModalBtn');
// const modal = document.getElementById('myModal');
const editmodal = document.getElementById('editmodal');
// const closeModalBtn = modal.querySelector('.close');
const closeEditModalBtn = editmodal.querySelector('.close');
// const doneBtn = modal.querySelector('.submit_subtasks');
const doneEditBtn = editmodal.querySelector('.submit_subtasks');

// function openModal() {
//   modal.style.display = 'block';
// }

// function closeModal() {
//   modal.style.display = 'none';
// }

function closeEditModal() {
  editmodal.style.display = 'none';
}

// openModalBtn.addEventListener('click', openModal);
// closeModalBtn.addEventListener('click', closeModal);
closeEditModalBtn.addEventListener('click', closeEditModal);
// window.addEventListener('click', (event) => {
//   if (event.target === modal) {
//     closeModal();
//   }
// });
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeEditModalBtn();
  }
});

// doneBtn.addEventListener('click', function () { closeModal(); });
doneEditBtn.addEventListener('click', function () { closeEditModal(); });

// text_area_subtasks = document.getElementById('text_area_subtasks');
// submit_subtask = document.getElementById('submit_subtask');
// subtasks = document.getElementsByClassName('subtasks')[0];

// function create_subtask_bars(subtask_content, subtask_id) {
//   const subtask_bar = div_class_id_content('div', 'subtask_bar', `subtask_bar_${subtask_id}`, '');
//   const subtask_bar_content = div_class_id_content('div', 'subtask_bar_content', `subtask_content_${subtask_id}`, subtask_content);
//   const subtask_bar_edit = div_class_id_content('button', 'subtask_bar_edit', `subtask_edit_${subtask_id}`, 'Edit');
//   const subtask_bar_delete = div_class_id_content('button', 'subtask_bar_delete', `subtask_delete_${subtask_id}`, 'Remove');

//   subtask_bar.appendChild(subtask_bar_content);
//   subtask_bar.appendChild(subtask_bar_edit);
//   subtask_bar.appendChild(subtask_bar_delete);
//   subtasks.appendChild(subtask_bar);
// }

// function editSubEle(tmp_subtasks, id) {
//   subtask_content_ = document.getElementById(`subtask_content_${id}`);
//   subtask_bar_edit = document.getElementById(`subtask_edit_${id}`);

//   if (subtask_bar_edit.innerText == 'Edit') {
//     subtask_bar_edit.innerText = 'Save';
//     subtask_content_.style.background = 'rgba(47, 47, 47, 0.5)'
//     subtask_content_.style.marginRight = '2px';
//     subtask_content_.style.border = '2px solid white';
//     subtask_content_.style.borderRadius = '5px';
//   } else {
//     subtask_bar_edit.innerText = 'Edit';
//     subtask_content_.style.background = 'none';
//     subtask_content_.style.marginRight = '0';
//     subtask_content_.style.border = 'none';
//     subtask_content_.style.borderRadius = 'none';

//     for (let i = 0; i < tmp_subtasks.length; i++) {
//       if (tmp_subtasks[i].id == id) {
//         tmp_subtasks[i].content = subtask_content_.innerText;
//       }
//     }
//   }
//   subtask_content_.contentEditable = !subtask_content_.isContentEditable;
// }

// submit_subtask.addEventListener('click', function () {
//   const subtask_string = text_area_subtasks.value;
//   if (subtask_string != '') {
//     const id = tmp_subtasks_id;
//     tmp_subtasks.push({ 'id': id, 'content': subtask_string });
//     create_subtask_bars(subtask_string, id);
//     text_area_subtasks.value = '';

//     subtask_bar_delete = document.getElementById(`subtask_delete_${id}`);
//     subtask_bar_delete.addEventListener('click', function (event) {
//       deleteEle(tmp_subtasks, id, 'subtask_bar_');
//     });

//     subtask_bar_edit = document.getElementById(`subtask_edit_${id}`);
//     subtask_bar_edit.addEventListener('click', function (event) {
//       editSubEle(tmp_subtasks, id);
//     });

//     tmp_subtasks_id++;
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////

function createNewCard(task_, display_) {
  const cardContainer = display_;

  // Create the new card elements
  const newCard = document.createElement('div');
  newCard.id = `card_${task_.id}`;
  newCard.classList.add('card');
  newCard.setAttribute('draggable', true);

  const titleElement = document.createElement('h2');
  titleElement.textContent = task_.title;
  titleElement.classList.add('title');

  const infoElement = document.createElement('div');
  infoElement.classList.add('info');

  const tagContents = task_.tags.map(tag => tag.content);
  let commaSeparatedTags = tagContents.join('</strong>, <strong>');
  commaSeparatedTags = commaSeparatedTags == '' ? 'None' : `<strong>${commaSeparatedTags}</strong>`;


  subtasks_element = `<ul class="subtask-list">`;
  for (let i = 0; i < task_.subtasks.length; i++) {
    subtasks_element += `<li>${task_.subtasks[i].content}</li>`;
  }
  subtasks_element += `</ul>`;
  completed_status = task_.completed ? 'Yes' : 'No';
  infoElement.innerHTML = `
      <p><strong>Completed:</strong> ${completed_status}</p>
      <p><strong>Category:</strong> ${task_.category}</p>
      <p><strong>Priority:</strong> ${task_.priority}</p>
      <p><strong>Due Date:</strong> ${task_.due_date}</p>
      <p><strong>Due Time:</strong> ${task_.due_time}</p>
      <p><strong>Subtasks:</strong> ${task_.subtasks.length}</p>
      ${subtasks_element}
      <p class="card_tag"><strong>Tags:</strong> ${commaSeparatedTags}</p>
      <div class="buttons">
          <button id="card_edit_${task_.id}" class="edit-button">Edit</button>
          <button id="card_delete_${task_.id}" class="delete-button">Delete</button>
      </div>
  `;

  newCard.addEventListener('dragstart', dragStart);
  newCard.addEventListener('dragover', dragOver);
  newCard.addEventListener('drop', drop);

  newCard.appendChild(titleElement);
  newCard.appendChild(infoElement);
  cardContainer.appendChild(newCard);

  card_edit_button = document.getElementById(`card_edit_${task_.id}`);
  card_edit_button.addEventListener("click", (e) => {
    editmodal.style.display = 'block';
  });

  card_delete_button = document.getElementById(`card_delete_${task_.id}`);
  card_delete_button.addEventListener("click", (e) => {
    deleteEleDOM(task_.id, "card_");
    tasks = tasks.filter(task => task.id !== task_.id);
    filtered_tasks = filtered_tasks.filter(task => task.id !== task_.id);
  });

}

let draggedCard = null;

function dragStart(event) {
  draggedCard = this;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
  this.classList.add('dragging');
}

function dragOver(event) {
  event.preventDefault();
  this.classList.add('dragover');
}

function drop(event) {
  event.preventDefault();
  if (draggedCard !== this) {
    const parent = this.parentNode;
    const placeholder = document.createElement('div');

    parent.insertBefore(placeholder, draggedCard);
    parent.insertBefore(draggedCard, this);
    parent.replaceChild(this, placeholder);
  }

  this.classList.remove('dragover');
  draggedCard.classList.remove('dragging');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let tasks = [];
let categories = ['Personal', 'Work', 'Home', 'Family', 'Health', 'Self-growth', 'Finance', 'Travel ', 'Social ', 'Other'];
let priority = ['Low', 'Medium', 'High'];
var index = 1;
let tasks_copy;

function deleteEle(task_array, id, str) {

  for (let i = 0; i < task_array.length; i++) {
    if (task_array[i].id == id) {
      task_array.splice(i, 1);
      break;
    }
  }

  console.log(id, task_array);
  removeEle = document.getElementById(str + id);
  removeEle.remove();

  // updateProgress();
}

// function alignTaskContent(task_main, task_content) {
//   var l = task_content.innerText.split('\n').length;

//   if (l < 2) {
//     task_main.style.height = "40px";
//     task_content.style.overflow = "none";
//   }
//   else if (l > 1 && l < 5) {
//     task_main.style.height = "fit-content";
//   } else {
//     task_main.style.height = "100px";
//     task_content.style.overflow = "auto";
//   }
// }

function editEle(id, task) {
  task_parent = document.getElementById(`task_${id}`);

  task_field = document.getElementById(`task_field_${id}`);

  task_content = document.getElementById(`content_${id}`);
  task_content.contentEditable = !task_content.isContentEditable;

  task_edit_button = document.getElementById(`edit_${id}`);

  if (task_edit_button.textContent == 'Edit') {
    task_parent.style.height = "100px";
    task_field.style.height = "100%";
    task_content.style.overflow = "auto";
    task_edit_button.style.background = "linear-gradient(to right, #6effab, #00cc76)";
    task_edit_button.textContent = 'Save';
  } else {
    task_edit_button.style.background = "linear-gradient(to right, #4dc2ff, #0080ff)";
    task_edit_button.textContent = 'Edit';

    task.title = task_content.innerText;

    alignTaskContent(task_parent, task_content);
  }
  task_edit_button.style.webkitBackgroundClip = "text";
  task_edit_button.style.webkitTextFillColor = "transparent";
}

function strikethroughV2(taskToUpdate, status) {
  task_content = document.getElementById(`content_${taskToUpdate.id}`);
  if (status == -1) {
    task_content.style.textDecoration = 'none';
    task_content.style.color = '#fff';
    taskToUpdate.completed = false;
  } else {
    task_content.style.textDecoration = 'line-through';
    task_content.style.color = '#009b00';
    taskToUpdate.completed = true;
  }
  // updateProgress();
}

function taskEventListeners(task) {
  task_delete_button.addEventListener("click", (e) => {
    deleteEle(tasks, `${task.id}`, 'task_grandpa_');
  });

  task_edit_button.addEventListener("click", (e) => {
    editEle(task.id, task);
  });

  task_status_tick.addEventListener("click", (e) => {
    strikethroughV2(task, 1);
  });

  task_status_cross.addEventListener("click", (e) => {
    strikethroughV2(task, -1);
  });
}

function addTask(task_value) {
  date_time_status = parseTodoText(enter_task.value);
  if (date_time_status != null) {
    const dateObject = new Date(date_time_status);

    // Extracting date components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const date = `${year}-${month}-${day}`;

    // Extracting time components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const time = `${hours}:${minutes}`;

    task_value[3] = date;
    task_value[4] = time;
  }

  tasks.push(
    {
      'id': index,
      'title': task_value[0],
      'completed': false,
      'category': task_value[1],
      'priority': task_value[2],
      'due_date': task_value[3],
      'due_time': task_value[4],
      'subtasks': tmp_subtasks,
      'tags': tmp_tags,
    }
  );

  index++;
  // displayEle(tasks[tasks.length - 1]);
  // taskEventListeners(tasks[tasks.length - 1]);

  displaySearchSortTask.style.display = 'none';
  displayTask.style.display = 'flex';
  displaySearchSortTask.innerHTML = '';
  displayTask.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    createNewCard(tasks[i], displayTask);
  }

  for (let i = 0; i < tmp_subtasks.length; i++) {
    try {
      deleteEleDOM(tmp_subtasks[i].id, `subtask_bar_`);
    } catch { }
  }

  for (let i = 0; i < tmp_tags.length; i++) {
    try {
      deleteEleDOM(tmp_tags[i].id, 'tag_bar_');
    } catch { }
  }

  tmp_subtasks = [];
  tmp_subtasks_id = 1;
  tmp_tags = [];
  tmp_tags_id = 1;
}

let taskForm = document.getElementById("taskForm");
let enter_task = document.getElementById("enter_task");
let enter_category = document.getElementById("category");
let enter_priority = document.getElementById("priority");
let enter_datePicker = document.getElementById("datePicker");
let enter_timePicker = document.getElementById("timePicker");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let info_array = [
    enter_task.value,
    enter_category.value,
    enter_priority.value,
    enter_datePicker.value,
    enter_timePicker.value,
  ]

  if (enter_task.value == "") {
    console.log("Ensure you input a valid task !");
  } else {
    addTask(info_array);

    console.log(info_array);

    enter_task.value = '';
    enter_category.value = 'Other';
    enter_priority.value = 'Medium';
    const today = new Date().toISOString().slice(0, 10);
    enter_datePicker.value = today;
    enter_timePicker.value = '23:59';
  }
});

let save_data = document.getElementById("save_data");
save_data.addEventListener("click", (e) => {
  const arrayJson = JSON.stringify(tasks);
  localStorage.setItem('task_data', arrayJson);
  const integerString = index.toString();
  localStorage.setItem('index', integerString);

  alert("data saved sucessfully.");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let display_filter = 0;

// search
function filterTasksByText(text) {
  return filtered_tasks.filter(task => {
    // Check if the text is present in the task's title
    if (task.title.includes(text)) {
      return true;
    }

    // Check if the text is present in any of the subtask's title
    for (const subtask of task.subtasks) {
      if (subtask.content.includes(text)) {
        return true;
      }
    }

    return false;
  });
}

let search = document.getElementById('search');
search.addEventListener("click", (e) => {
  task_search = document.getElementById("enter_task_search").value;
  fil_cat = document.getElementById("category_search").value;
  fil_pri = document.getElementById("priority_search").value;
  fil_date = document.getElementById("datePickerSearch").value;
  fil_time = document.getElementById("timePickerSearch").value;

  console.log(task_search, fil_cat, fil_pri, fil_date, fil_time);

  filtered_tasks = [...tasks];

  let count = 0;

  if (fil_cat != '') {
    filtered_tasks = filtered_tasks.filter(item => item.category == fil_cat);
    count++;
  }
  if (fil_pri != '') {
    filtered_tasks = filtered_tasks.filter(item => item.priority == fil_pri);
    count++;
  }
  if (fil_date != '') {
    filtered_tasks = filtered_tasks.filter(item => item.due_date <= fil_date);
    count++;
  }
  if (fil_time != '') {
    filtered_tasks = filtered_tasks.filter(item => item.due_time <= fil_time);
    count++;
  }
  if (task_search != '') {
    filtered_tasks = filterTasksByText(task_search);
    count++;
  }

  console.log(filtered_tasks);

  if (count > 0) {
    display_filter = 1;
    displaySearchSortTask.style.display = 'flex';
    displaySearchSortTask.innerHTML = '';
    displayTask.style.display = 'none';
    displayTask.innerHTML = '';
    for (let i = 0; i < filtered_tasks.length; i++) {
      // console.log(filtered_tasks.length);
      createNewCard(filtered_tasks[i], displaySearchSortTask);
    }
  }

  count = 0;
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// sort
backlog_sort = document.getElementById("backlog");
priority_sort = document.getElementById("priority_sort");
dateTime_sort = document.getElementById("dateTime_sort");
category_sort = document.getElementById("category_sort");

function toggleTextColor(element) {
  console.log(element.style.color);
  if (element.style.color == "white" || element.style.color == "") {
    element.style.color = "green";
  } else {
    element.style.color = "white";
  }
}

backlog_sort.addEventListener("click", function () {
  toggleTextColor(this);
});

priority_sort.addEventListener("click", function () {
  toggleTextColor(this);
});

dateTime_sort.addEventListener("click", function () {
  toggleTextColor(this);
});

category_sort.addEventListener("click", function () {
  toggleTextColor(this);
});

let sort = document.getElementById('sort');
sort.addEventListener("click", (e) => {

  function sortByCompleted(a, b) {
    return a.completed - b.completed;
  }

  function sortByDeadline(a, b) {
    const dateA = new Date(`${a.due_date}T${a.due_time}`);
    const dateB = new Date(`${b.due_date}T${b.due_time}`);
    return dateA - dateB;
  }

  function sortByPriority(a, b) {
    const priorityOrder = ['High', 'Medium', 'Low']; // Define the priority order
    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  }

  function sortByCategory(a, b) {
    if (a.category < b.category) {
      return -1;
    } else if (a.category > b.category) {
      return 1;
    } else {
      return 0;
    }
  }

  count = 0;
  if (backlog_sort.style.color == "green") {
    filtered_tasks.sort(sortByCompleted);
    count++;
  }

  if (priority_sort.style.color == "green") {
    filtered_tasks.sort(sortByPriority);
    count++;
  }

  if (dateTime_sort.style.color == "green") {
    filtered_tasks.sort(sortByDeadline);
    count++;
  }

  if (category_sort.style.color == "green") {
    filtered_tasks.sort(sortByCategory);
    count++;
  }

  console.log(filtered_tasks);

  if (count > 0) {
    display_filter = 1;
    displaySearchSortTask.style.display = 'flex';
    displaySearchSortTask.innerHTML = '';
    displayTask.style.display = 'none';
    displayTask.innerHTML = '';
    for (let i = 0; i < filtered_tasks.length; i++) {
      createNewCard(filtered_tasks[i], displaySearchSortTask);
    }
  }

  count = 0;
});

///////////////////////////////////////////////////////////////////////////////////////////

//search sort reset
let reset_search = document.getElementById('reset_search');
reset_search.addEventListener("click", (e) => {
  filtered_tasks = [...tasks];
  display_filter = 0;
  displaySearchSortTask.style.display = 'none';
  displayTask.style.display = 'flex';
  displaySearchSortTask.innerHTML = '';
  displayTask.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    createNewCard(tasks[i], displayTask);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let info_array = [
//   'enter_task.value',
//   'enter_category.value',
//   'enter_priority.value',
//   'enter_datePicker.value',
//   'enter_timePicker.value',
// ]

// tmp_subtasks = [{ 'id': 0, 'content': 'sfw' }, { 'id': 1, 'content': 'sfw' }, { 'id': 2, 'content': 'sfw' }, { 'id': 3, 'content': 'sfw' }, { 'id': 0, 'content': 'sfw' },];
// tmp_tags = [{ 'id': 0, 'content': 'sfw' }, { 'id': 1, 'content': 'sfw' }, { 'id': 2, 'content': 'sfw' }, { 'id': 3, 'content': 'sfw' }];
// addTask(info_array, -1);

// const storedArrayJson = localStorage.getItem('task_data');
// const storedArray = JSON.parse(storedArrayJson);

// const storedIntegerString = localStorage.getItem('index');
// index = parseInt(storedIntegerString);
// tasks = storedArray;



// tasks.push(
//   {
//     'id': index,
//     'title': task_value[0],
//     'completed': false,
//     'category': task_value[1],
//     'priority': task_value[2],
//     'due_date': task_value[3],
//     'due_time': task_value[4],
//     'subtasks': tmp_subtasks,
//     'tags': tmp_tags,
//   }
// );
tmp_subtasks = [{ 'id': 1, 'content': 'a' }, { 'id': 2, 'content': 'b' }, { 'id': 3, 'content': 'c' }, { 'id': 4, 'content': 'd' }, { 'id': 5, 'content': 'w' },];
tmp_tags = [{ 'id': 1, 'content': 'x' }, { 'id': 2, 'content': 'y' }, { 'id': 3, 'content': 'z' }, { 'id': 4, 'content': 'f' }];
addTask(['abc', 'Personal', 'High', new Date().toISOString().slice(0, 8) + '30', '23:14']);
addTask(['abcdefg', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14']);
addTask(['abc ave', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14']);
addTask(['abcdefg wed w', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14']);
addTask(['abcdefg qegvlkn', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14']);

let filtered_tasks = [...tasks];
// console.log(tasks);
// for (let i = 0; i < tasks.length; i++) {
//   displayEle(tasks[i]);
//   taskEventListeners(tasks[i]);
// }
