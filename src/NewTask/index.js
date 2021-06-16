import React from 'react';
import TaskForm from './taskForm';
import './index.scss';

export default function NewTask(props) {
    const { toDoList, setToDoList } = props;

    return <div className="new-task">
        <div className="title">
            New Task
        </div>
        <TaskForm toDoList={toDoList} setToDoList={setToDoList} />
    </div>
}