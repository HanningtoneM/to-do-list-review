const { addNewTask, deleteTask } = require('./test-files/add_and_remove.js');
const { populate } = require('./test-files/index.js');

describe('Test Add and Remove', () => {
  test('should add tasks to list', () => {
    document.body.innerHTML = `
      <div>
        <ul id="task-list">
            
        </ul>
        <input id="task-description" value="something">
          
        </input>
      </div>
    `;
    addNewTask();

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);

    const taskList = document.querySelectorAll('#task-list li');
    expect(taskList).toHaveLength(1);
  });

  test('should remove tasks from list', () => {
    document.body.innerHTML = `
      <div>
        <ul id="task-list">
            
        </ul>
        <input id="task-description" value="something">
          
        </input>
      </div>
    `;

    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);

    let taskList = document.querySelectorAll('#task-list li');
    const initialLength = taskList.length;

    deleteTask({ index: 1 });
    tasks = JSON.parse(localStorage.getItem('tasks'));
    populate(tasks);

    taskList = document.querySelectorAll('#task-list li');

    expect(taskList).toHaveLength(initialLength - 1);
  });
});