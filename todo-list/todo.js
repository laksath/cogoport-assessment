//general code to create new elements
function div_class_id_content(div_, class_, id_, content_) {
  element = document.createElement(div_);
  element.classList.add(class_);
  element.id = id_;
  element.innerText = content_;
  return element;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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



//Modal Code
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



let tasks = [];
let categories = ['Personal', 'Work', 'Home', 'Family', 'Health', 'Self-growth', 'Finance', 'Travel ', 'Social ', 'Other'];
let priority = ['Low', 'Medium', 'High'];
var index = 1;
let displayTasks = document.getElementById("displayTask")
let tasks_copy;

function updateProgress() {

  let tmp_count = 0;
  for (i = 0; i < tasks.length; i++) if (tasks[i].completed == 1) tmp_count++;
  progress = tasks.length == 0 ? 0 : Math.round(tmp_count * 10000 / tasks.length) / 100;

  const progressBar = document.querySelector('.progress');
  // progressBar.style.width = progress + '%';
  progressBar.style.width = progress + '%';

  const completed = document.querySelector('.completed');

  let SPEED = 40;
  let limit = Math.floor(progress);

  for (let i = 0; i <= limit; i++) {
    setTimeout(function () {
      completed.innerText = `Completed : ${i}%`;
    }, SPEED * i);
  }
  setTimeout(function () { completed.innerText = `Completed : ${progress}%`; }, SPEED * (limit + 1));
}

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

function alignTaskContent(task_main, task_content) {
  var l = task_content.innerText.split('\n').length;

  if (l < 2) {
    task_main.style.height = "40px";
    task_content.style.overflow = "none";
  }
  else if (l > 1 && l < 5) {
    task_main.style.height = "fit-content";
  } else {
    task_main.style.height = "100px";
    task_content.style.overflow = "auto";
  }
}

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

function displayEle(task) {

  task_grand_parent = div_class_id_content('div', 'task_grandpa', `task_grandpa_${task.id}`, '');

  task_parent = div_class_id_content('div', 'task', `task_${task.id}`, '');

  task_field = div_class_id_content('div', 'task_field', `task_field_${task.id}`, '');
  task_content = div_class_id_content('div', 'task_content', `content_${task.id}`, task.title);
  task_edit_button = div_class_id_content('button', 'task_edit_button', `edit_${task.id}`, 'Edit');
  task_delete_button = div_class_id_content('button', 'task_delete_button', `delete_${task.id}`, 'Delete');

  task_status = div_class_id_content('div', 'task_status', `task_status_${task.id}`, '');
  task_status_content = div_class_id_content('div', 'task_status_content', `task_status_content_${task.id}`, 'Status');
  task_status_tick = div_class_id_content('button', 'task_status_tick', `tick_${task.id}`, '✔');
  task_status_cross = div_class_id_content('button', 'task_status_cross', `cross_${task.id}`, '🗙');

  task_field.appendChild(task_content);
  task_field.appendChild(task_edit_button);
  task_field.appendChild(task_delete_button);
  task_parent.appendChild(task_field);

  task_status.appendChild(task_status_content);
  task_status.appendChild(task_status_tick);
  task_status.appendChild(task_status_cross);
  task_parent.appendChild(task_status);

  // displayTasks.appendChild(task_parent);
  task_grand_parent.appendChild(task_parent);

  task_parent2 = div_class_id_content('div', 'task2', `task2_${task.id}`, '');

  // task_category_text = div_class_id_content('div', 'task_category_text', `task_category_text_${task.id}`, 'Category');
  // task_category_button = div_class_id_content('div', 'task_category_button', `task_category_button_${task.id}`, `${task.category}`);
  // task_category = div_class_id_content('div', 'task_category', `task_category_${task.id}`, '');

  // task_priority_text = div_class_id_content('div', 'task_priority_text', `task_priority_text_${task.id}`, 'Priority');
  // task_priority_button = div_class_id_content('div', 'task_priority_button', `task_priority_button_${task.id}`, `${task.priority}`);
  // task_priority = div_class_id_content('div', 'task_priority', `task_priority_${task.id}`, '');

  // task_due_date_text = div_class_id_content('div', 'task_due_date_text', `task_due_date_text_${task.id}`, 'Due Date');
  // task_due_date_button = div_class_id_content('div', 'task_due_date_button', `task_due_date_button_${task.id}`, `${task.due_date}`);
  // task_due_date = div_class_id_content('div', 'task_due_date', `task_due_date_${task.id}`, '');

  // task_due_time_text = div_class_id_content('div', 'task_due_time_text', `task_due_time_text_${task.id}`, 'Due Time');
  // task_due_time_button = div_class_id_content('div', 'task_due_time_button', `task_due_time_button_${task.id}`, `${task.due_time}`);
  // task_due_time = div_class_id_content('div', 'task_due_time', `task_due_time_${task.id}`, '');

  // task_full_task = div_class_id_content('div', 'task_full_task', `task_full_task_${task.id}`, 'View Full Task');

  task_category_text = div_class_id_content('div', 'task_text', `task_category_text_${task.id}`, 'Category');
  task_category_button = div_class_id_content('div', 'task_text_button', `task_category_button_${task.id}`, `${task.category}`);
  task_category = div_class_id_content('div', 'task_tot', `task_category_${task.id}`, '');

  task_priority_text = div_class_id_content('div', 'task_text', `task_priority_text_${task.id}`, 'Priority');
  task_priority_button = div_class_id_content('div', 'task_text_button', `task_priority_button_${task.id}`, `${task.priority}`);
  task_priority = div_class_id_content('div', 'task_tot', `task_priority_${task.id}`, '');

  task_due_date_text = div_class_id_content('div', 'task_text', `task_due_date_text_${task.id}`, 'Due Date');
  task_due_date_button = div_class_id_content('div', 'task_text_button', `task_due_date_button_${task.id}`, `${task.due_date}`);
  task_due_date = div_class_id_content('div', 'task_tot', `task_due_date_${task.id}`, '');

  task_due_time_text = div_class_id_content('div', 'task_text', `task_due_time_text_${task.id}`, 'Due Time');
  task_due_time_button = div_class_id_content('div', 'task_text_button', `task_due_time_button_${task.id}`, `${task.due_time}`);
  task_due_time = div_class_id_content('div', 'task_tot', `task_due_time_${task.id}`, '');

  task_subtasks_text = div_class_id_content('div', 'task_text', `task_subtasks_text_${task.id}`, 'Subtasks');
  task_subtasks_button = div_class_id_content('div', 'task_text_button', `task_subtasks_button_${task.id}`, `${task.subtasks.length}`);
  task_subtasks = div_class_id_content('div', 'task_tot', `task_subtasks_${task.id}`, '');

  task_tags_text = div_class_id_content('div', 'task_text', `task_tags_text_${task.id}`, 'Tags');
  task_tags_button = div_class_id_content('div', 'task_text_button', `task_tags_button_${task.id}`, `${task.tags.length}`);
  task_tags = div_class_id_content('div', 'task_tot', `task_tags_${task.id}`, '');

  task_full_task = div_class_id_content('button', 'task_full_task', `task_full_task_${task.id}`, 'View & Edit Task');

  task_category.appendChild(task_category_text);
  task_category.appendChild(task_category_button);

  task_priority.appendChild(task_priority_text);
  task_priority.appendChild(task_priority_button);

  task_due_date.appendChild(task_due_date_text);
  task_due_date.appendChild(task_due_date_button);

  task_due_time.appendChild(task_due_time_text);
  task_due_time.appendChild(task_due_time_button);

  task_subtasks.appendChild(task_subtasks_text);
  task_subtasks.appendChild(task_subtasks_button);

  task_tags.appendChild(task_tags_text);
  task_tags.appendChild(task_tags_button);

  task_parent2.appendChild(task_category);
  task_parent2.appendChild(task_priority);
  task_parent2.appendChild(task_due_date);
  task_parent2.appendChild(task_due_time);
  task_parent2.appendChild(task_subtasks);
  task_parent2.appendChild(task_tags);

  task_grand_parent.appendChild(task_parent2);


  task_parent3 = div_class_id_content('div', 'task3', `task3_${task.id}`, '');

  task_subtask_display = div_class_id_content('div', 'task_display', `task_subtask_display_${task.id}`, 'SubTask Display');
  task_subtask_display_collapse = div_class_id_content('button', 'task_display_button', `task_subtask_display_collapse_button_${task.id}`, `View`);
  task_subtask_display_content = div_class_id_content('div', 'task_display_content', `task_subtask_display_content_${task.id}`, '');
  for (let i = 0; i < task.subtasks.length; i++) {
    task_subtask_display_item =
      div_class_id_content('div', 'task_display_item', `task_subtask_display_item_${task.subtasks[i].id}`, `${task.subtasks[i].content}`);
    task_subtask_display_content.appendChild(task_subtask_display_item);
  }

  task_tag_display = div_class_id_content('div', 'task_display', `task_tag_display_${task.id}`, 'Tag Display');
  task_tag_display_collapse = div_class_id_content('button', 'task_display_button', `task_tag_display_collapse_${task.id}`, `View`);
  task_tag_display_content = div_class_id_content('div', 'task_display_content', `task_tag_display_content_${task.id}`, '');
  for (let i = 0; i < task.tags.length; i++) {
    task_tag_display_item =
      div_class_id_content('div', 'task_display_item', ``, `${task.tags[i].content}`);
    task_tag_display_content.appendChild(task_tag_display_item);
  }

  task_subtask_display.appendChild(task_subtask_display_collapse);
  task_subtask_display.appendChild(task_subtask_display_content);

  task_tag_display.appendChild(task_tag_display_collapse);
  task_tag_display.appendChild(task_tag_display_content);

  task_parent3.appendChild(task_subtask_display);
  task_parent3.appendChild(task_tag_display);

  task_grand_parent.appendChild(task_parent3);


  displayTasks.appendChild(task_grand_parent);

  alignTaskContent(task_parent, task_content);

  if (task.completed) {
    strikethroughV2(task, 1);
  } else {
    strikethroughV2(task, -1);
  }
}

function addTask(task_value, ix) {
  if (ix == -1) {
    tasks.push(
      {
        'userId': 0,
        'id': index,
        'title': task_value[0],
        'completed': false,
        'category': task_value[1],
        'priority': task_value[2],
        'due_date': task_value[3],
        'due_time': task_value[4],
        'subtasks': tmp_subtasks,
        'tags': tmp_tags,
      });
  } else {
    task_value['category'] = 'Other';
    task_value['priority'] = 'Medium';

    const currentDate = new Date();
    task_value['due_date'] = currentDate.toISOString().split('T')[0];
    task_value['due_time'] = '23:59';
    task_value['subtasks'] = [];
    task_value['tags'] = [];
    tasks.push(task_value);
  }
  index++;
  displayEle(tasks[tasks.length - 1]);
  taskEventListeners(tasks[tasks.length - 1]);

  function deleteEleDOM(id, str) {
    removeEle = document.getElementById(str + id);
    removeEle.remove();
  }

  for (let i = 0; i < tmp_subtasks.length; i++) {
    deleteEleDOM(tmp_subtasks[i].id, 'subtask_bar_');
  }

  for (let i = 0; i < tmp_tags.length; i++) {
    deleteEleDOM(tmp_tags[i].id, 'tag_bar_');
  }

  tmp_subtasks = [];
  tmp_subtasks_id = 1;
  tmp_tags = [];
  tmp_tags_id = 1;
}

let taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let enter_task = document.getElementById("enter_task");
  let enter_category = document.getElementById("category");
  let enter_priority = document.getElementById("priority");
  let enter_datePicker = document.getElementById("datePicker");
  let enter_timePicker = document.getElementById("timePicker");

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
    addTask(info_array, -1);
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

async function getapi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (tasks.length == 0) {
      ix = data.length;
      for (let i = 0; i < ix; i++) {
        addTask(data[i], 1);
      }
    }
  } catch (error) {
    console.error("Error in fetching API :", error);
  }
}

function addTask2(task_value) {
  tasks.push(task_value);
  index++;
  displayEle(tasks[tasks.length - 1]);
  taskEventListeners(tasks[tasks.length - 1]);

  function deleteEleDOM(id, str) {
    removeEle = document.getElementById(str + id);
    removeEle.remove();
  }

  for (let i = 0; i < tmp_subtasks.length; i++) {
    deleteEleDOM(tmp_subtasks[i].id, 'subtask_bar_');
  }

  for (let i = 0; i < tmp_tags.length; i++) {
    deleteEleDOM(tmp_tags[i].id, 'tag_bar_');
  }

  tmp_subtasks = [];
  tmp_subtasks_id = 1;
  tmp_tags = [];
  tmp_tags_id = 1;
}

let search = document.getElementById('search');
search.addEventListener("click", (e) => {
  task_search = document.getElementById("enter_task_search");
  fil_cat = document.getElementById("category_search");
  fil_pri = document.getElementById("priority_search");
  fil_date = document.getElementById("datePickerSearch");
  fil_time = document.getElementById("timePickerSearch");

  filtered_tasks = tasks.slice();
  tasks_copy = tasks.slice();

  for (i = 0; i < tasks.length; i++) {
    id = tasks[i].id;
    removeEle = document.getElementById(`task_grandpa_${id}`);
    removeEle.remove();
  }

  if (fil_cat.value != '') {
    filtered_tasks = filtered_tasks.filter(item => item.category == fil_cat.value);
  }
  if (fil_pri.value != '') {
    filtered_tasks = filtered_tasks.filter(item => item.category == fil_pri.value);
  }
  if (fil_date.value != '') {
    filtered_tasks = filtered_tasks.filter(item => item.category == fil_date.value);
  }
  if (fil_time.value != '') {
    filtered_tasks = filtered_tasks.filter(item => item.category == fil_time.value);
  }

  console.log(filtered_tasks[0]);
  for (i = 0; i < filtered_tasks.length; i++) {
    displayEle(filtered_tasks[i]);
  }
});

let reset_search = document.getElementById('reset_search');
search.addEventListener("click", (e) => {
  for (i = 0; i < tasks.length; i++) {
    id = tasks[i].id;
    removeEle = document.getElementById(`task_grandpa_${id}`);
    try{
      removeEle.remove();
    }catch (error){
      continue;
    }
  }
});


getapi("https://jsonplaceholder.typicode.com/todos");

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
const storedArrayJson = localStorage.getItem('task_data');
const storedArray = JSON.parse(storedArrayJson);

if (storedArray == null) {
  getapi("https://jsonplaceholder.typicode.com/todos");
} else {
  const storedIntegerString = localStorage.getItem('index');
  index = parseInt(storedIntegerString);
  tasks = storedArray;
  // console.log(tasks);
  for (let i = 0; i < tasks.length; i++) {
    displayEle(tasks[i]);
    taskEventListeners(tasks[i]);
  }
}
