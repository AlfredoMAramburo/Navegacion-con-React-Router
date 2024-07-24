import React from 'react';
import './TodoSearch.css';

function TodoSearch({ searchValue, setSearchValue, loading, totalTodos  }) {
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
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
