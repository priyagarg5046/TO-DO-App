
import { useState } from 'react'
// custom components
import CustomForm from './Components/CustomForm'
import EditForm from './Components/EditForm'
import TaskList from './Components/TaskList'



function App() {
  const [tasks, setTasks] = useState([]);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }
 

  const moveTaskup = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex > 0) {
      const reorderedTasks = [...tasks];
      const movedTask = reorderedTasks[taskIndex];
      reorderedTasks[taskIndex] = reorderedTasks[taskIndex - 1];
      reorderedTasks[taskIndex - 1] = movedTask;

      setTasks(reorderedTasks);
    }
  };

  const moveTaskdown = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex < tasks.length - 1) {
      const reorderedTasks = [...tasks];
      const movedTask = reorderedTasks[taskIndex];
      reorderedTasks[taskIndex] = reorderedTasks[taskIndex + 1];
      reorderedTasks[taskIndex + 1] = movedTask;

      setTasks(reorderedTasks);
    }
  };

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="container bg-gradient-to-r from-cyan-500 to-blue-500">
      <header>
        <h1 className="font-bold">My Task List</h1>
      </header>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm addTask={addTask}/>
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
          moveTaskup={moveTaskup}
          moveTaskdown={moveTaskdown}
         
        />
      )}
    </div>
  )
}

export default App