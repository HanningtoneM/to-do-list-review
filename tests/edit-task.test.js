const { populate } = require('./test-files/index.js');
const { editTask, addNewTask } = require('./test-files/add_and_remove.js');

describe('Test Edit Task Functionality', () => {
  test('should edit a task', () => {
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
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);
    const addedListItemElement = document.querySelector('#task-list li');
    const spanItem = addedListItemElement.children[0];
    const mockEvent = {
      target: document.createElement('i'),
    };
    editTask(mockEvent,
      addedListItemElement,
      spanItem.children[1],
      spanItem,
      tasks,
      tasks[0],
      populate);
    const inputElement = spanItem.children[1];
    inputElement.value = 'New Task Description';
    const e = document.createEvent('HTMLEvents');
    e.initEvent('keydown', false, true);
    e.key = 'Enter';
    inputElement.dispatchEvent(e);
    expect(spanItem.children[1].value).toBe('New Task Description');
  });
});