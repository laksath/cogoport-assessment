tasks = [];
tags = [];
subtasks = [];
// task_id,
//  task_name, 
//  task_status, 
//  task_category, 
//  task_due_date, 
//  task_due_time, 
//  task_priority, 
//  task_tags, 
//  task_subtasks

submitTask = document.getElementById('submitTask');
submitTask.addEventListener('click', function (event) {
    event.preventDefault();

    const enter_task = document.getElementById('enter_task').value;
    const enter_task_category = document.getElementById('enter_task_category').value;
    const enter_priority = document.getElementById('enter_priority').value;
    const enter_due_time = document.getElementById('enter_due_time').value;
    const enter_due_date = document.getElementById('enter_due_date').value;

    console.log('submit', enter_task, enter_task_category, enter_priority, enter_due_time, enter_due_date);

    tags = [];
    subtasks = [];
});

enter_tag = document.getElementById('enter_tag');

function div_class_id_content(div_, class_, id_, content_) {
    element = document.createElement(div_);
    element.classList.add(class_);
    element.id = id_;
    element.innerText = content_;
    return element;
}

display_tags = document.getElementById("display_tags");

function deleteTagElement(tag_id) {
    document.getElementById(tag_id).remove();
    tags.splice(tags.findIndex(item => item.tag_id === tag_id), 1);
}

function createTagElement(tag_id, tag_text) {
    parentElement = div_class_id_content('div', 'tag_item', tag_id, '');

    tag_text = div_class_id_content('div', 'tagText', '', tag_text);
    tag_delete = div_class_id_content('button', 'tagDelete', '', 'x');
    tag_delete.addEventListener('click', function () {
        deleteTagElement(tag_id);
    });

    parentElement.appendChild(tag_text);
    parentElement.appendChild(tag_delete);

    display_tags.appendChild(parentElement);
}

function addTag() {
    tag_id = tags.length == 0 ? `tag_0` : `tag_${Number(tags[tags.length - 1].tag_id.substring(4, tags[tags.length - 1].tag_id.length)) + 1}`;
    tag_text = `#${enter_tag.value}`;
    createTagElement(tag_id, tag_text);
    tags.push({ 'tag_id': tag_id, 'tag_content': tag_text });
    console.log(tags);
}



display_subtasks = document.getElementById("display_subtasks");

function deleteSubTaskElement(subtask_id) {
    document.getElementById(subtask_id).remove();
    subtasks.splice(subtasks.findIndex(item => item.subtask_id === subtask_id), 1);
}

function editSubTaskElement(subtask_id) {
    subtask_text = document.getElementById(`${subtask_id}_text`)
    subtask_edit = document.getElementById(`${subtask_id}_edit`)

    if (subtask_edit.innerText == 'Edit') {
        subtask_edit.innerText = 'Save';
    } else {
        subtask_edit.innerText = 'Edit';
        subtasks_ix = subtasks.findIndex(item => item.subtask_id === subtask_id);
        subtasks[subtasks_ix].subtask_content = subtask_text.innerText;
    }

    subtask_text.contentEditable = !subtask_text.isContentEditable;
}

function createSubTaskElement(subtask_id, subtask_text) {
    parentElement = div_class_id_content('div', 'subtask_item', subtask_id, '');

    subtask_text = div_class_id_content('div', 'subtaskText', `${subtask_id}_text`, subtask_text);

    subtask_edit = div_class_id_content('button', 'subtaskEdit', `${subtask_id}_edit`, 'Edit');
    subtask_edit.addEventListener('click', function () {
        editSubTaskElement(subtask_id);
    });

    subtask_delete = div_class_id_content('button', 'subtaskDelete', '', 'x');
    subtask_delete.addEventListener('click', function () {
        console.log("delete " + subtask_id);
        deleteSubTaskElement(subtask_id);
    });

    parentElement.appendChild(subtask_text);
    parentElement.appendChild(subtask_edit);
    parentElement.appendChild(subtask_delete);

    display_subtasks.appendChild(parentElement);
}

function addSubTask() {
    subtask_id = subtasks.length == 0 ? `subtask_0` : `subtask_${Number(subtasks[subtasks.length - 1].subtask_id.substring(8, subtasks[subtasks.length - 1].subtask_id.length)) + 1}`;
    subtask_text = `#${enter_subtask.value}`;
    createSubTaskElement(subtask_id, subtask_text);
    subtasks.push({ 'subtask_id': subtask_id, 'subtask_content': subtask_text });
    console.log(subtasks);
}

