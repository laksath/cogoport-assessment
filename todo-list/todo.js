////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_task_container = document.getElementById('taskForm');
search_task_container = document.getElementById('taskFormSearch');
sort_task_container = document.getElementById('taskFormSort');
sort_task_container_desc = document.getElementById('taskFormSortDesc');
displayTask = document.getElementById('displayTask');
displaySearchSortTask = document.getElementById('displaySearchSortTask');
let reset_search = document.getElementById('reset_search');

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

const sort_task_checkbox_desc = document.getElementById('sort_task_toggle_desc');
sort_task_checkbox_desc.addEventListener('change', function () {
  if (sort_task_checkbox_desc.checked) {
    console.log('Checkbox is checked.');
    sort_task_container_desc.style.display = 'block';
  } else {
    console.log('Checkbox is unchecked.');
    sort_task_container_desc.style.display = 'none';
  }
});

const display_task_checkbox = document.getElementById('display_task_toggle');
display_task_checkbox.addEventListener('change', function () {
  if (display_task_checkbox.checked) {
    console.log('Checkbox is checked.');
    displayTask.style.display = 'flex';
    displaySearchSortTask.style.display = 'flex';
    reset_search.style.display = 'block';
  } else {
    console.log('Checkbox is unchecked.');
    displayTask.style.display = 'none';
    displaySearchSortTask.style.display = 'none';
    reset_search.style.display = 'none';
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
const tag_display = document.getElementById('tag_display');
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

let text_area_subtasks = document.getElementById('text_area_subtasks');
let submit_subtask = document.getElementById('submit_subtask');
let subtasks = document.getElementsByClassName('subtasks')[0];

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

function editSubEle(tmp_subtasks, content_, bar_edit, id) {
  subtask_content_ = document.getElementById(`${content_}${id}`);
  subtask_bar_edit = document.getElementById(`${bar_edit}${id}`);

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
      editSubEle(tmp_subtasks, 'subtask_content_', 'subtask_edit_', id);
    });

    tmp_subtasks_id++;
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const editmodal = document.getElementById('editmodal');
const closeEditModalBtn = editmodal.querySelector('.close');
const doneEditBtn = editmodal.querySelector('.submit_edit_modal');

function closeEditModal() {
  editmodal.style.display = 'none';
}


closeEditModalBtn.addEventListener('click', closeEditModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeEditModalBtn();
  }
});

let edit_enter_task = document.getElementById('edit_enter_task');
let edit_category = document.getElementById('edit_category');
let edit_priority = document.getElementById('edit_priority');
let edit_datePicker = document.getElementById('edit_datePicker');
let edit_timePicker = document.getElementById('edit_timePicker');
let edit_tag_text = document.getElementById('edit_tag_text');
let edit_tag_display = document.getElementById('edit_tag_display');
let text_area_subtasks2 = document.getElementById('text_area_subtasks2');
let submit_subtask2 = document.getElementById('submit_subtask2');
let editsubtasks = document.getElementsByClassName('editsubtasks')[0];


function edit_create_subtask_bars(subtask_content, subtask_id) {
  const edit_subtask_bar = div_class_id_content('div', 'subtask_bar', `edit_subtask_bar_${subtask_id}`, '');
  const edit_subtask_bar_content = div_class_id_content('div', 'subtask_bar_content', `edit_subtask_content_${subtask_id}`, subtask_content);
  const edit_subtask_bar_edit = div_class_id_content('button', 'subtask_bar_edit', `edit_subtask_edit_${subtask_id}`, 'Edit');
  const edit_subtask_bar_delete = div_class_id_content('button', 'subtask_bar_delete', `edit_subtask_delete_${subtask_id}`, 'Remove');

  edit_subtask_bar.appendChild(edit_subtask_bar_content);
  edit_subtask_bar.appendChild(edit_subtask_bar_edit);
  edit_subtask_bar.appendChild(edit_subtask_bar_delete);
  editsubtasks.appendChild(edit_subtask_bar);
}

submit_subtask2.addEventListener('click', function () {
  console.log("*");
  let ix1 = 0;
  for (ix1; ix1 < tasks.length; ix1++) {
    if (tasks[ix1].id == lastClickedId) break;
  }

  // let ix2 = 0;
  // for (ix2; ix2 < filtered_tasks.length; ix2++) {
  //   if (filtered_tasks[ix2].subtask_id == lastClickedId) break;
  // }

  if (ix1 != tasks.length) {
    const subtask_string = text_area_subtasks2.value;
    if (subtask_string != '') {
      const id = tasks[ix1].subtask_id;
      tasks[ix1].subtasks.push({ 'id': id, 'content': subtask_string });
      // filtered_tasks[ix2].subtasks.push({ 'id': id, 'content': subtask_string });

      edit_create_subtask_bars(subtask_string, id);
      text_area_subtasks2.value = '';

      subtask_bar_delete = document.getElementById(`edit_subtask_delete_${id}`);
      subtask_bar_delete.addEventListener('click', function (event) {
        deleteEle(tasks[ix1].subtasks, id, 'edit_subtask_bar_');
        // deleteEle(filtered_tasks[ix2].subtasks, id, 'edit_subtask_bar_');
      });

      subtask_bar_edit = document.getElementById(`edit_subtask_edit_${id}`);
      subtask_bar_edit.addEventListener('click', function (event) {
        editSubEle(tasks[ix1].subtasks, 'edit_subtask_content_', 'edit_subtask_edit_', id);
        // editSubEle(filtered_tasks[ix2].subtasks, 'edit_subtask_content_', 'edit_subtask_edit_', id);
      });

      console.log();
      tasks[ix1].subtask_id += 1;
      console.log(id, tasks[ix1].subtask_id);
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//editModal Tags

const edit_tag_button = document.getElementById('edit_tag_button');
// let edit_tag_text = document.getElementById('edit_tag_text');
// let edit_tag_display = document.getElementById('edit_tag_display');

function edit_create_tag_bars(tag_content, tag_id) {
  const edit_tag_bar = div_class_id_content('div', 'tag_bar', `edit_tag_bar_${tag_id}`, '');
  const edit_tag_bar_content = div_class_id_content('div', 'tag_bar_content', `edit_tag_content_${tag_id}`, tag_content);
  const edit_tag_bar_delete = div_class_id_content('div', 'tag_bar_delete', `edit_tag_delete_${tag_id}`, 'x');

  edit_tag_bar.appendChild(edit_tag_bar_content);
  edit_tag_bar.appendChild(edit_tag_bar_delete);
  edit_tag_display.appendChild(edit_tag_bar);
}

function edit_check_text_display(tag_val) {
  if (tag_val.length != 0) {
    edit_tag_display.firstChild.textContent = '';
    edit_tag_display.style.alignItems = 'stretch';
    edit_tag_display.style.justifyContent = 'flex-start';
  } else {
    edit_tag_display.firstChild.textContent = 'The tags will appear here';
    edit_tag_display.style.alignItems = 'center';
    edit_tag_display.style.justifyContent = 'center';
  }
}

edit_tag_button.addEventListener('click', function (event) {
  event.preventDefault();

  let tag_text_val = edit_tag_text.value.replace(/ /g, '_');

  let ix1 = 0;
  for (ix1; ix1 < tasks.length; ix1++) {
    if (tasks[ix1].id == lastClickedId) break;
  }

  if (ix1 < tasks.length && tag_text_val != '') {
    const id = tasks[ix1].tag_id;
    tag_text_val = `#${tag_text_val}`;
    tasks[ix1].tags.push({ 'id': id, 'content': tag_text_val });
    edit_create_tag_bars(tag_text_val, id);
    const tag_bar_delete = document.getElementById(`edit_tag_delete_${id}`);
    tag_bar_delete.addEventListener('click', function (event) {
      deleteEle(tasks[ix1].tags, id, 'edit_tag_bar_');
      edit_check_text_display(tasks[ix1].tags);
    });
    tasks[ix1].tag_id += 1;
  }

  edit_check_text_display(tasks[ix1].tags);
  edit_tag_text.value = '';
});

// edit_tag_text.addEventListener('keydown', function (event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     edit_tag_button.click();
//   }
// });

////////////////////////////////////////////////////////////////
function updatemodalElements(task_) {
  editsubtasks.innerHTML = '';
  edit_tag_text.value = '';
  edit_tag_display.innerHTML = 'The tags will appear here';

  edit_enter_task.value = task_.title;
  edit_category.value = task_.category;
  edit_priority.value = task_.priority;
  edit_datePicker.value = task_.due_date;
  edit_timePicker.value = task_.due_time;

  subtask_contents = task_.subtasks;
  text_area_subtasks2.value = '';


  tags_content = task_.tags;

  // create what's not there
  for (let i = 0; i < tags_content.length; i++) {
    const id = tags_content[i].id;
    edit_create_tag_bars(tags_content[i].content, id);
    const tag_bar_delete = document.getElementById(`edit_tag_delete_${id}`);
    tag_bar_delete.addEventListener('click', function (event) {
      deleteEle(task_.tags, id, 'edit_tag_bar_');
      edit_check_text_display(task_.tags);
    });
  }
  edit_check_text_display(task_.tags);


  // create what's not there
  for (let i = 0; i < subtask_contents.length; i++) {
    edit_create_subtask_bars(subtask_contents[i].content, subtask_contents[i].id);

    subtask_bar_delete = document.getElementById(`edit_subtask_delete_${subtask_contents[i].id}`);
    subtask_bar_delete.addEventListener('click', function (event) {
      deleteEle(tasks, subtask_contents[i].id, 'edit_subtask_bar_');
      // deleteEle(filtered_tasks, subtask_contents[i].id, 'edit_subtask_bar_');
    });
    subtask_bar_edit = document.getElementById(`edit_subtask_edit_${subtask_contents[i].id}`);
    subtask_bar_edit.addEventListener('click', function (event) {
      editSubEle(tasks, 'edit_subtask_content_', 'edit_subtask_edit_', subtask_contents[i].id);
      // editSubEle(filtered_tasks, 'edit_subtask_content_', 'edit_subtask_edit_', subtask_contents[i].id);
    });
  }
}
////////////////////////////////////////////////////////////////

doneEditBtn.addEventListener('click', function () {

  let ix1 = 0;
  for (ix1; ix1 < tasks.length; ix1++) {
    if (tasks[ix1].id == lastClickedId) break;
  }

  tasks[ix1].title = edit_enter_task.value;
  tasks[ix1].category = edit_category.value;
  tasks[ix1].priority = edit_priority.value;
  tasks[ix1].due_date = edit_datePicker.value;
  tasks[ix1].due_time = edit_timePicker.value;

  closeEditModal();


  let card_id = `card_${tasks[ix1].id}`;
  let card = document.getElementById(card_id);
  let card_title = card.querySelector('.title');
  card_title.textContent = tasks[ix1].title;

  let card_info = card.querySelector('.info');
  let card_tagContents = tasks[ix1].tags.map(tag => tag.content);
  let commaSeparatedTags = card_tagContents.join('</strong>, <strong>');

  commaSeparatedTags = commaSeparatedTags == '' ? 'None' : `<strong>${commaSeparatedTags}</strong>`;
  let subtasks_element = `<ul class="subtask-list">`;
  for (let i = 0; i < tasks[ix1].subtasks.length; i++) {
    subtasks_element += `<li>${tasks[ix1].subtasks[i].content}</li>`;
  }
  subtasks_element += `</ul>`;
  let completed_status = tasks[ix1].completed ? 'Yes' : 'No';

  card_info.innerHTML = `
      <p><strong>Completed:</strong> ${completed_status}</p>
      <p><strong>Category:</strong> ${tasks[ix1].category}</p>
      <p><strong>Priority:</strong> ${tasks[ix1].priority}</p>
      <p><strong>Due Date:</strong> ${tasks[ix1].due_date}</p>
      <p><strong>Due Time:</strong> ${tasks[ix1].due_time}</p>
      <p><strong>Subtasks:</strong> ${tasks[ix1].subtasks.length}</p>
      ${subtasks_element}
      <p class="card_tag"><strong>Tags:</strong> ${commaSeparatedTags}</p>
      <div class="buttons">
          <button id="card_edit_${tasks[ix1].id}" class="edit-button">Edit</button>
          <button id="card_delete_${tasks[ix1].id}" class="delete-button">Delete</button>
      </div>
      <button id="card_complete_${tasks[ix1].id}" class="complete_button">Incomplete</button>
  `;

  let card_edit_button = document.getElementById(`card_edit_${tasks[ix1].id}`);
  card_edit_button.addEventListener("click", (e) => {
    editmodal.style.display = 'block';
    lastClickedId = tasks[ix1].id;
    updatemodalElements(tasks[ix1]);
  });

  let card_delete_button = document.getElementById(`card_delete_${tasks[ix1].id}`);
  card_delete_button.addEventListener("click", (e) => {
    deleteEleDOM(tasks[ix1].id, "card_");
    tasks = tasks.filter(task => task.id !== tasks[ix1].id);
    filtered_tasks = filtered_tasks.filter(task => task.id !== tasks[ix1].id);
  });

  let card_complete_button = document.getElementById(`card_complete_${tasks[ix1].id}`);
  card_complete_button.addEventListener("click", (e) => {
    card_complete_status(tasks[ix1]);
  });

});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////


let lastClickedId = 0;
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
  infoElement.id = `info_${task_.id}`;

  const tagContents = task_.tags.map(tag => tag.content);
  let commaSeparatedTags = tagContents.join('</strong>, <strong>');
  commaSeparatedTags = commaSeparatedTags == '' ? 'None' : `<strong>${commaSeparatedTags}</strong>`;


  let subtasks_element = `<ul class="subtask-list">`;
  for (let i = 0; i < task_.subtasks.length; i++) {
    subtasks_element += `<li>${task_.subtasks[i].content}</li>`;
  }
  subtasks_element += `</ul>`;

  infoElement.innerHTML = `
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
      <button id="card_complete_${task_.id}" class="complete_button">Incomplete</button>
  `;

  newCard.addEventListener('dragstart', dragStart);
  newCard.addEventListener('dragover', dragOver);
  newCard.addEventListener('drop', drop);

  newCard.appendChild(titleElement);
  newCard.appendChild(infoElement);
  cardContainer.appendChild(newCard);

  completion_status = document.getElementById(`card_complete_${task_.id}`);
  if (!task_.completed) {
    task_.completed = false;
    completion_status.innerText = 'Incomplete';
    completion_status.style.backgroundColor = 'darkslategray';

  } else {
    task_.completed = true;
    completion_status.innerText = 'Completed';
    completion_status.style.backgroundColor = 'green';
  }

  let card_edit_button = document.getElementById(`card_edit_${task_.id}`);
  card_edit_button.addEventListener("click", (e) => {
    editmodal.style.display = 'block';
    lastClickedId = task_.id;
    updatemodalElements(task_);
  });

  let card_delete_button = document.getElementById(`card_delete_${task_.id}`);
  card_delete_button.addEventListener("click", (e) => {
    deleteEleDOM(task_.id, "card_");
    tasks = tasks.filter(task => task.id !== task_.id);
    filtered_tasks = filtered_tasks.filter(task => task.id !== task_.id);
  });

  let card_complete_button = document.getElementById(`card_complete_${task_.id}`);
  card_complete_button.addEventListener("click", (e) => {
    card_complete_status(task_);
  });

}

function card_complete_status(task_) {
  let card_complete_button = document.getElementById(`card_complete_${task_.id}`);

  if (task_.completed) {
    task_.completed = false;
    card_complete_button.innerText = 'Incomplete';
    card_complete_button.style.backgroundColor = 'darkslategray';

  } else {
    task_.completed = true;
    card_complete_button.innerText = 'Completed';
    card_complete_button.style.backgroundColor = 'green';
  }
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
let index = 1;
let tasks_copy;

function deleteEle(task_array, id, str) {

  for (let i = 0; i < task_array.length; i++) {
    if (task_array[i].id == id) {
      task_array.splice(i, 1);
      break;
    }
  }

  removeEle = document.getElementById(str + id);
  try {
    console.log(id, task_array);
    removeEle.remove();
  } catch { }

  // updateProgress();
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
      'subtask_id': task_value[5],
      'tag_id': task_value[6],
      'subtasks': tmp_subtasks,
      'tags': tmp_tags,
    }
  );

  filtered_tasks = [...tasks];

  console.log(tasks[tasks.length - 1]);

  index++;

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
    tmp_subtasks_id,
    tmp_tags_id
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
  localStorage.setItem('todo_data', arrayJson);
  const integerString = index.toString();
  localStorage.setItem('todo_index', integerString);

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

// sort desc
backlog_sort_desc = document.getElementById("backlog_desc");
priority_sort_desc = document.getElementById("priority_sort_desc");
dateTime_sort_desc = document.getElementById("dateTime_sort_desc");
category_sort_desc = document.getElementById("category_sort_desc");

function toggleTextColor(element) {
  console.log(element.style.color);
  if (element.style.color == "white" || element.style.color == "") {
    element.style.color = "green";
  } else {
    element.style.color = "white";
  }
}

backlog_sort_desc.addEventListener("click", function () {
  toggleTextColor(this);
});

priority_sort_desc.addEventListener("click", function () {
  toggleTextColor(this);
});

dateTime_sort_desc.addEventListener("click", function () {
  toggleTextColor(this);
});

category_sort_desc.addEventListener("click", function () {
  toggleTextColor(this);
});

let sort_desc = document.getElementById('sort_desc');
sort_desc.addEventListener("click", (e) => {

  function sortByCompleted_desc(a, b) {
    return a.completed - b.completed;
  }

  function sortByDeadline_desc(a, b) {
    const dateA = new Date(`${a.due_date}T${a.due_time}`);
    const dateB = new Date(`${b.due_date}T${b.due_time}`);
    return dateA - dateB;
  }

  function sortByPriority_desc(a, b) {
    const priorityOrder = ['High', 'Medium', 'Low']; // Define the priority order
    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  }

  function sortByCategory_desc(a, b) {
    if (a.category < b.category) {
      return -1;
    } else if (a.category > b.category) {
      return 1;
    } else {
      return 0;
    }
  }

  count = 0;
  if (backlog_sort_desc.style.color == "green") {
    filtered_tasks.sort(sortByCompleted_desc);
    count++;
  }

  if (priority_sort_desc.style.color == "green") {
    filtered_tasks.sort(sortByPriority_desc);
    count++;
  }

  if (dateTime_sort_desc.style.color == "green") {
    filtered_tasks.sort(sortByDeadline_desc);
    count++;
  }

  if (category_sort_desc.style.color == "green") {
    filtered_tasks.sort(sortByCategory_desc);
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

const storedArrayJson = localStorage.getItem('todo_data');
const storedArray = JSON.parse(storedArrayJson);
tasks = storedArray;
if (tasks == null) tasks = [];
const storedIntegerString = localStorage.getItem('todo_index');
if (storedIntegerString == null) index = 1;
else
  index = parseInt(storedIntegerString);



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

// tmp_subtasks = [{ 'id': 1, 'content': 'a' }, { 'id': 2, 'content': 'b' }, { 'id': 3, 'content': 'c' }, { 'id': 4, 'content': 'd' }, { 'id': 5, 'content': 'w' },];
// tmp_tags = [{ 'id': 1, 'content': 'x' }, { 'id': 2, 'content': 'y' }, { 'id': 3, 'content': 'z' }, { 'id': 4, 'content': 'f' }];
// addTask(['abc', 'Personal', 'High', new Date().toISOString().slice(0, 8) + '30', '23:14', 6, 5]);
// addTask(['abcdefg', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14', 1, 1]);
// tmp_subtasks = [{ 'id': 1, 'content': 'a' }, { 'id': 2, 'content': 'b' }, { 'id': 3, 'content': 'c' }, { 'id': 4, 'content': 'd' }, { 'id': 5, 'content': 'w' },];
// tmp_tags = [{ 'id': 1, 'content': 'x' }, { 'id': 2, 'content': 'y' }, { 'id': 3, 'content': 'z' }, { 'id': 4, 'content': 'f' }];
// addTask(['abc ave', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14', 6, 5]);
// addTask(['abcdefg wed w', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14', 1, 1]);
// addTask(['abcdefg qegvlkn', 'Personal', 'High', new Date().toISOString().slice(0, 10), '23:14', 1, 1]);

let filtered_tasks = [...tasks];
// console.log(tasks);
// for (let i = 0; i < tasks.length; i++) {
//   displayEle(tasks[i]);
//   taskEventListeners(tasks[i]);
// }

const clickEvent = new Event('click');
reset_search.dispatchEvent(clickEvent);