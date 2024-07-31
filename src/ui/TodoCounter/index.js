import React from 'react';
import './TodoCounter.css';

function TodoCounter({ totalTodos, completedTodos, loading }) {
  if (totalTodos === 0) {
    return (
      <h2 className="TodoCounter">
        ¡Crea tu primer Meta!
      </h2>
    );
  }

  return (
    <h2
      className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}
    >
      {completedTodos === totalTodos ? (
        <span>Has completado todas las metas</span>
      ) : (
        <>
          Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> TODOS
        </>
      )}
    </h2>
  );
}

export { TodoCounter };
