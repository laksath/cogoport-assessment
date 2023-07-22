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


//Modal Code
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = modal.querySelector('.close');

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





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



let tasks = [];
let categories = ['Personal', 'Work', 'Home', 'Family', 'Health', 'Self-growth', 'Finance', 'Travel ', 'Social ', 'Miscellaneous'];
let priority = ['Low', 'Medium', 'High'];
var index = 1;
let displayTasks = document.getElementById("displayTask")


function updateProgress() {

  let tmp_count = 0;
  for (i = 0; i < tasks.length; i++) if (tasks[i].completed == 1) tmp_count++;

  progress = tasks.length == 0 ? 0 : Math.round(tmp_count * 10000 / tasks.length) / 100;

  const progressBar = document.querySelector('.progress');
  progressBar.style.width = progress + '%';

  const completed = document.querySelector('.completed');

  let SPEED = 40;
  let limit = Math.floor(progress);

  for (let i = 0; i <= limit; i++) {
    setTimeout(function () {
      completed.innerText = `Completed : ${i}% (${tmp_count}/${tasks.length})`;
    }, SPEED * i);
  }
  setTimeout(function () { completed.innerText = `Completed : ${progress}% (${tmp_count}/${tasks.length})`; }, SPEED * (limit + 1));
}

function deleteEle(task_array, id, str) {

  // tmp_array = task_array.filter(function (item) {
  //   return item.id != id;
  // });
  // task_array = tmp_array;

  for(let i=0;i<task_array.length;i++){
    if(task_array[i].id==id){
      task_array.splice(i, 1);
    }
  }

  console.log(id,task_array);
  removeEle = document.getElementById(str + id);
  removeEle.remove();
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
  updateProgress();
}

function taskEventListeners(task) {
  task_delete_button.addEventListener("click", (e) => {
    deleteEle(tasks, `${task.id}`, 'task_');
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

  task_parent = div_class_id_content('div', 'task', `task_${task.id}`, '');

  task_field = div_class_id_content('div', 'task_field', `task_field_${task.id}`, '');
  task_content = div_class_id_content('div', 'task_content', `content_${task.id}`, task.title);
  task_edit_button = div_class_id_content('button', 'task_edit_button', `edit_${task.id}`, 'Edit');
  task_delete_button = div_class_id_content('button', 'task_delete_button', `delete_${task.id}`, 'Delete');

  // category
  category_field = div_class_id_content('select', 'task_category', `task_category_${task.id}`, '');
  categories.forEach(category => {
    const option = document.createElement('option');
    option.textContent = category;
    category_field.appendChild(option);
  });
  const defaultOption = category_field.querySelector(`option[value="${task.category}"]`);
  // defaultOption.selected

  //due date
  //priority
  //filters
  //tags


  task_status = div_class_id_content('div', 'task_status', `task_status_${task.id}`, '');
  task_status_content = div_class_id_content('div', 'task_status_content', `task_status_content_${task.id}`, 'Status');
  task_status_tick = div_class_id_content('button', 'task_status_tick', `tick_${task.id}`, '✔');
  task_status_cross = div_class_id_content('button', 'task_status_cross', `cross_${task.id}`, '🗙');

  task_field.appendChild(task_content);
  task_field.appendChild(task_edit_button);
  task_field.appendChild(task_delete_button);
  task_parent.appendChild(task_field);

  // task_parent.appendChild(category_field);

  task_status.appendChild(task_status_content);
  task_status.appendChild(task_status_tick);
  task_status.appendChild(task_status_cross);
  task_parent.appendChild(task_status);

  displayTasks.appendChild(task_parent);

  alignTaskContent(task_parent, task_content);

  if (task.completed) {
    strikethroughV2(task, 1);
  } else {
    strikethroughV2(task, -1);
  }
}

function addTask(task_value, ix) {
  if (ix == -1) {
    tasks.push({ 'userId': 0, 'id': index, 'title': task_value, 'completed': false });
  } else {
    task_value['category'] = 'Medium';
    task_value['priority'] = 'Miscellaneous';

    const currentDate = new Date();
    task_value['due_date'] = currentDate.toISOString().split('T')[0];
    task_value['due_time'] = '23:59:59';
    task_value['subtaks'] = [];
    tasks.push(task_value);
    index;
  }
  index++;
  displayEle(tasks[tasks.length - 1]);
  taskEventListeners(tasks[tasks.length - 1]);
}

// let tag_text = document.getElementById("taskForm");

let taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let enter_task = document.getElementById("enter_task");

  console.log(document.getElementById("category").value);
  console.log(document.getElementById("priority").value);
  console.log(document.getElementById("datePicker").value);
  console.log(document.getElementById("timePicker").value);


  if (enter_task.value == "") {
    console.log("Ensure you input a valid task !");
  } else {
    addTask(enter_task.value, -1);
    enter_task.value = '';
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
      console.log(`data len:${ix}`);
      for (let i = 0; i < ix; i++) {
        addTask(data[i], 1);
      }
    }
  } catch (error) {
    console.error("Error in fetching API :", error);
  }
}

// getapi("https://jsonplaceholder.typicode.com/todos");
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

updateProgress();