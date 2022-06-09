const { populate } = require('./test-files/index.js');
const { addNewTask, clearAllCompleted } = require('./test-files/add_and_remove.js');
describe('Test Clear All Completed', () => {
  test('should clear all completed tasks;', () => {
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
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[1].completed = true;
    tasks[2].completed = true;
    tasks[4].completed = true;
    tasks[5].completed = true;
    tasks[7].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);
    let taskList = document.querySelectorAll('#task-list li');
    expect(taskList.length).toBe(8);
    clearAllCompleted();
    tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);
    taskList = document.querySelectorAll('#task-list li');
    expect(taskList.length).toBe(3);
  });
});