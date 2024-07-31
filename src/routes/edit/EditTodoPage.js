import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TodoForm } from '../../ui/TodoForm';
import { useTodos } from '../useTodos';

function EditTodoPage() {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  const { 
    loading, 
    getTodo, 
    editTodo 
  } = useTodos();

  let todoText = '';

  if (location.state?.todo?.text) {
    todoText = location.state.todo.text;
  } else if (loading) {
    return <p>Cargando...</p>;
  } else {
    const todo = getTodo(id);
    if (todo) {
      todoText = todo.text;
    } else {
      return <p>Todo no encontrado</p>;
    }
  }

  return (
    <TodoForm
      label="Edita tu Meta:"
      defaultValue={todoText}
      submitButtonText="Editar"
      submitEvent={({ text }) => editTodo(id, text)}
    />
  );
}

export { EditTodoPage };

