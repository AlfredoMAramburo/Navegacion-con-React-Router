import React from 'react';
import { useTodos } from './useTodos';
import { TodoHeader } from '../TodoHeader';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';
import { ChangeAlert } from '../ChangeAlert';
import './App.css';

// Estado inicial
const initialState = {
  openModal: false,
  searchValue: '',
};

// Tipos de acción
const actionTypes = {
  SET_OPEN_MODAL: 'SET_OPEN_MODAL',
  SET_SEARCH_VALUE: 'SET_SEARCH_VALUE',
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case actionTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  const { 
    error, 
    loading, 
    searchedTodos, 
    completeTodo, 
    deleteTodo, 
    totalTodos, 
    completedTodos, 
    addTodo, 
    sincronizeTodos } = useTodos();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setOpenModal = (open) => {
    dispatch({ type: actionTypes.SET_OPEN_MODAL, payload: open });
  };

  const setSearchValue = (value) => {
    dispatch({ type: actionTypes.SET_SEARCH_VALUE, payload: value });
  };

  const { openModal, searchValue } = state;

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          totalTodos={totalTodos}
          loading={loading}
        />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) => 
        <p className='leyendaSeachText'>No hay resultados para {searchText}</p>}
      >
        {todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />

      <ChangeAlert
        sincronize={sincronizeTodos}
      />
    </React.Fragment>
  );
}

export default App;
