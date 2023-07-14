import React, { useReducer, useRef } from 'react';

const reducer = (state, action) => {    
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { content: action.payload, hidden: false }],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload ? { ...task, hidden: !task.hidden } : task
        ),
      };
    default:
      return state;
  }
};

const TaskList = () => {
  const [state, dispatch] = useReducer(reducer, { tasks: [] });
  const inputRef = useRef(null);

  const handleAddTask = () => {
    const task = inputRef.current.value;
    dispatch({ type: 'ADD_TASK', payload: task });
    inputRef.current.value = '';
  };

  const handleScrollToTop = () => {
    inputRef.current.focus();
  };

  const handleToggleTask = (index) => {
    dispatch({ type: 'TOGGLE_TASK', payload: index });
  };

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" ref={inputRef} />
      </div>
      <div className="button-container">
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {state.tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task.hidden ? (
              <span className="task-item-content">The Content is Hidden</span>
            ) : (
              <>
                <span className="task-item-content">{task.content}</span>
              </>
            )}
            <button
              className="toggle-button"
              onClick={() => handleToggleTask(index)}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleScrollToTop}>Scroll to Top</button>
    </div>
  );
};

export default TaskList;