import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TodoSearch.css';

function TodoSearch({ searchValue, setSearchValue, loading, totalTodos }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onSearchValueChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);

    // Actualiza la URL con el nuevo valor de búsqueda
    const params = new URLSearchParams(location.search);
    params.set('search', newValue);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Buscar Metas"
      value={searchValue}
      onChange={onSearchValueChange}
      disabled={loading || totalTodos === 0}
    />
  );
}

export { TodoSearch };
