
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
