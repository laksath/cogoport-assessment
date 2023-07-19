let tasks = [];
var index = 1;

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


let displayTasks = document.getElementById("displayTask")
let taskForm = document.getElementById("taskForm");

function deleteEle(id) {

  tasks = tasks.filter(function (item) {
    return item.id != id;
  });

  removeEle = document.getElementById(`task_${id}`);
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
    task_content.style.marginRight = '0';
  }
}

function editEle(id) {

  task_content = document.getElementById(`content_${id}`);
  task_content.contentEditable = !task_content.isContentEditable;
  task_main = document.getElementById(`task_${id}`);
  task_edit_button = document.getElementById(`edit_${id}`);

  if (task_edit_button.textContent == 'Edit') {
    task_main.style.height = "100px";
    task_content.style.overflow = "auto";
    task_edit_button.style.background = "linear-gradient(to right, #6effab, #00cc76)";
    task_edit_button.textContent = 'Save';
  } else {
    task_edit_button.style.background = "linear-gradient(to right, #4dc2ff, #0080ff)";
    task_edit_button.textContent = 'Edit';

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks[i].title = task_content.innerText;
        break;
      }
    }

    alignTaskContent(task_main,task_content);

    // var l = task_content.innerText.split('\n').length;

    // if (l < 2) {
    //   task_main.style.height = "40px";
    //   task_content.style.overflow = "none";
    // }
    // else if (l > 1 && l < 5) {
    //   task_main.style.height = "fit-content";
    // } else {
    //   task_main.style.height = "100px";
    //   task_content.style.overflow = "auto";
    //   task_content.style.marginRight = '0';
    // }
  }
  task_edit_button.style.webkitBackgroundClip = "text";
  task_edit_button.style.webkitTextFillColor = "transparent";
}

function displayEle(task) {

  function div_class_id_content(div_, class_, id_, content_) {
    element = document.createElement(div_);
    element.classList.add(class_);
    element.id = id_;
    element.innerText = content_;
    return element;
  }

  task_parent = div_class_id_content('div', 'task', `task_${task.id}`, '');
  task_container = div_class_id_content('div', 'task_field', `task_field_${task.id}`, '');
  console.log(task.title);
  task_content = div_class_id_content('div', 'task_content', `content_${task.id}`, task.title);
  task_edit_button = div_class_id_content('button', 'task_edit_button', `edit_${task.id}`, 'Edit');
  task_delete_button = div_class_id_content('button', 'task_delete_button', `delete_${task.id}`, 'Delete');

  task_container.appendChild(task_content);
  task_container.appendChild(task_edit_button);
  task_container.appendChild(task_delete_button);
  task_parent.appendChild(task_container);

  task_status = div_class_id_content('div', 'task_status', `task_status_${task.id}`, '');
  task_status_content = div_class_id_content('div', 'task_status_content', `task_status_content_${task.id}`, 'Task Status : ');

  task_status_tick = div_class_id_content('button', 'task_status_tick', `tick_${task.id}`, '✔');
  task_status_cross = div_class_id_content('button', 'task_status_cross', `cross_${task.id}`, '🗙');

  task_status.appendChild(task_status_content);
  task_status.appendChild(task_status_tick);
  task_status.appendChild(task_status_cross);
  task_parent.appendChild(task_status);

  displayTasks.appendChild(task_parent);

  alignTaskContent(task_container,task_content);

  task_delete_button.addEventListener("click", (e) => {
    deleteEle(task.id);
  });

  task_edit_button.addEventListener("click", (e) => {
    editEle(task.id);
  });
}

function addTask(task_value, ix) {
  if (ix == -1) {
    tasks.push({ 'userId': 0, 'id': index++, 'title': task_value, 'completed': false });
  } else {
    tasks.push(task_value);
    index++;
  }
  displayEle(tasks[tasks.length - 1]);
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let enter_task = document.getElementById("enter_task");

  if (enter_task.value == "") {
    console.log("Ensure you input a valid task !");
  } else {
    console.log("*");
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
  }
}
