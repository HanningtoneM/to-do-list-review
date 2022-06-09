const { updateStatus } = require('./test-files/status.js');
const { populate } = require('./test-files/index.js');
const { addNewTask } = require('./test-files/add_and_remove.js');

describe('Test Status Change Functionality', () => {
  test('should set a task\'s status to completed', () => {
    document.body.innerHTML = `
      <div>
        <ul id="task-list">
        </ul>
        <input id="task-description" value="something">
        </input>
      </div>
    `;
    localStorage.clear();
    addNewTask();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);
    const addedListItemElement = document.querySelector('#task-list li');
    const spanItem = addedListItemElement.children[0];
    const textElement = spanItem.children[1];
    const checkBox = spanItem.children[0];
    checkBox.checked = true;
    updateStatus(textElement, checkBox, tasks[0]);
    tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].completed).toBe(true);
  });
  test('should set a task\'s status to uncompleted', () => {
    document.body.innerHTML = `
      <div>
        <ul id="task-list">
        </ul>
        <input id="task-description" value="something">
        </input>
      </div>
    `;
    localStorage.clear();
    addNewTask();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);
    const addedListItemElement = document.querySelector('#task-list li');
    const spanItem = addedListItemElement.children[0];
    const textElement = spanItem.children[1];
    const checkBox = spanItem.children[0];
    checkBox.checked = true;
    updateStatus(textElement, checkBox, tasks[0]);
    tasks = JSON.parse(localStorage.getItem('tasks'));
    checkBox.checked = false;
    updateStatus(textElement, checkBox, tasks[0]);
    expect(tasks[0].completed).toBe(false);
  });
});