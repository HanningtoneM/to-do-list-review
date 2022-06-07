import './style.css';

import { dragStart, dragOver, drop } from './drag.js';
import {
  addNewTask, editTask, deleteTask, clearAllCompleted,
} from './add_and_remove.js';
import updateStatus from './status.js';

const taskList = document.getElementById('task-list');

let allTasks = [
];

const populate = ((tasks) => {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.draggable = true;
    listItem.classList.add('border-bottom', 'p-3', 'pt-2', 'pb-2', 'd-flex', 'flex-row', 'justify-content-between', 'align-items-center');
    listItem.id = task.index;

    const spanItem = document.createElement('span');
    const textElement = document.createElement('p');
    textElement.innerText = task.description;
    textElement.classList.add('d-inline');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('me-2');
    const menu = document.createElement('i');
    menu.classList.add('fa', 'fa-ellipsis-v', 'text-secondarys');
    menu.addEventListener('click', (e) => {
      editTask(e, listItem, textElement, spanItem, allTasks, task, populate);
      menu.addEventListener('click', () => {
        deleteTask(task);
        allTasks = JSON.parse(localStorage.getItem('tasks'));
        const sortedTasks = allTasks.sort((a, b) => a.index - b.index);
        populate(sortedTasks);
      });
    });
    spanItem.append(checkBox, textElement);

    listItem.append(spanItem, menu);
    taskList.append(listItem);

    listItem.addEventListener('dragover', dragOver);
    listItem.addEventListener('dragstart', dragStart);

    if (task.completed) {
      textElement.classList.add('strike', 'text-muted');
      checkBox.checked = true;
    }

    checkBox.addEventListener('change', () => {
      updateStatus(textElement, checkBox, task);
    });
  });
});

taskList.addEventListener('drop', (e) => {
  const sortedTasks = allTasks.sort((a, b) => a.index - b.index);
  drop(e, sortedTasks, populate);
});

if (localStorage.getItem('tasks')) {
  allTasks = JSON.parse(localStorage.getItem('tasks'));
} else {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

document.getElementById('add-button').addEventListener('click', () => {
  addNewTask();
  allTasks = JSON.parse(localStorage.getItem('tasks'));
  const sortedTasks = allTasks.sort((a, b) => a.index - b.index);
  populate(sortedTasks);
});

document.getElementById('task-description').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addNewTask();
    allTasks = JSON.parse(localStorage.getItem('tasks'));
    const sortedTasks = allTasks.sort((a, b) => a.index - b.index);
    populate(sortedTasks);
  }
});

document.getElementById('clear-completed-button').addEventListener('click', () => {
  clearAllCompleted();
  if (localStorage.getItem('tasks')) {
    allTasks = JSON.parse(localStorage.getItem('tasks'));
    const sortedTasks = allTasks.sort((a, b) => a.index - b.index);
    populate(sortedTasks);
  }
});

const sortedTasks = allTasks.sort((a, b) => a.index - b.index);
document.addEventListener('DOMContentLoaded', populate(sortedTasks));