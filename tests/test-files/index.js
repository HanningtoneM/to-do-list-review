const { dragStart, dragOver } = require('./drag.js');
const { editTask, deleteTask } = require('./add_and_remove.js');
const { updateStatus } = require('./status.js');

let allTasks = [
];

function populate(tasks) {
  const taskList = document.getElementById('task-list');
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
}

module.exports = { populate };