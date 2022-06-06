function updateStatus(textElement, checkBox, task) {
  const allTasks = JSON.parse(localStorage.getItem('tasks'));
  const currentTask = allTasks.find((t) => t.index === task.index);
  textElement.classList.toggle('strike');
  textElement.classList.toggle('text-muted');
  if (checkBox.checked) {
    task.completed = true;
    currentTask.completed = true;
  } else {
    task.completed = false;
    currentTask.completed = false;
  }
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

export default updateStatus;