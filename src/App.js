import React, { useEffect, useState } from 'react';
import NewTask from './NewTask/index';
import ToDoList from './ToDoList/index';
import './App.scss';

function App() {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    setToDoList([{
      name: "do homework 1",
      desc: '1',
      piority: 0,
      dueDate: '2021-12-12',
      isOpenDetail: false,
      status: false,
    }, {
      name: "do homework 2",
      desc: '2',
      piority: 1,
      dueDate: '2021-12-13',
      isOpenDetail: false,
      status: false,
    }, {
      name: "do homework 3",
      desc: '3',
      piority: 2,
      dueDate: '2021-12-11',
      isOpenDetail: false,
      status: false,
    }])
  }, []);

  console.log('to do list => ', toDoList)

  return (
    <div className="App">
      <NewTask toDoList={toDoList} setToDoList={setToDoList} />
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
    </div>
  );
}

export default App;
