import React, { useState } from 'react';
import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const columns = [
    { field: "description", sortable: true, filter: true, floatingFilter: true },
    { field: "date", sortable: true, filter: true, floatingFilter: true },
    {
      field: "priority", sortable: true, filter: true, floatingFilter: true,
      cellStyle: params => params.value.toLowerCase() === "high" ? { color: 'red' } : { color: 'black' }
    }
  ]


  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    const selected = gridRef.current.api.getSelectedNodes();
    if (selected.length > 0) {
      setTodos(todos.filter((todo, index) =>
        index !== selected[0].childIndex))
    }
    else {
      alert('Select a row first!');
    }

  }

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description} />
      <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date} />
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority} />
      <button onClick={addTodo}>Add</button><button onClick={deleteTodo}>Delete</button>

      <div className="ag-theme-material"
        style={{ height: '700px', width: '70%', margin: 'auto' }} >
        <AgGridReact
          ref={gridRef}
          animateRows={true}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos} />
      </div>

      <table>
        <tbody>
          {
            todos.map((todo, index) => <tr key={index}><td>{todo.description}</td><td>{todo.date}</td><td>{todo.priority}</td></tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default App;
