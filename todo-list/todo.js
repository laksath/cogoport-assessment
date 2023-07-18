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

function editEle(id) {

  task_content = document.getElementById(`content_${id}`);
  task_content.contentEditable = !task_content.isContentEditable;
  task = document.getElementById(`task_${id}`);
  task_edit_button = document.getElementById(`edit_${id}`);

  if (task_edit_button.textContent == 'Edit') {
    task.style.height = "100px";
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

    var l = task_content.innerText.split('\n').length;



    if (l < 2) {
      task.style.height = "40px";
      task_content.style.overflow = "none";
    }
    else if (l > 1 && l < 5) {
      task.style.height = "fit-content";
    } else {
      task.style.height = "100px";
      task_content.style.overflow = "auto";
      task_content.style.marginRight = '0';
    }
  }
  task_edit_button.style.webkitBackgroundClip = "text";
  task_edit_button.style.webkitTextFillColor = "transparent";
}

function displayEle(task) {

  // try{
  //   console.log(task.id);
  // }catch{
  //   console.log(task);
  // }

  task_container = document.createElement('div');
  task_container.classList.add('task');
  task_container.id = `task_${task.id}`;

  task_content = document.createElement('div');
  task_content.classList.add('task_content');
  task_content.id = `content_${task.id}`;
  task_content.textContent = task.title;

  if (task_content.offsetHeight > 40 && task_content.offsetHeight < 100) {
    task_content.height = '100px'
  }

  if (task_content.offsetHeight > 99) {
    task_content.height = '100px'
    task_content.style.overflow = "auto";
    task_content.style.marginRight = '0';
  }

  task_edit_button = document.createElement('button');
  task_edit_button.classList.add('task_edit_button');
  task_edit_button.id = `edit_${task.id}`;
  task_edit_button.textContent = 'Edit';

  task_delete_button = document.createElement('button');
  task_delete_button.classList.add('task_delete_button');
  task_delete_button.id = `delete_${task.id}`;
  task_delete_button.textContent = 'Delete';

  task_container.appendChild(task_content);
  task_container.appendChild(task_edit_button);
  task_container.appendChild(task_delete_button);
  displayTasks.appendChild(task_container);

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
