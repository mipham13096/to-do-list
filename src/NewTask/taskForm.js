import React, { useState } from 'react';
import moment from 'moment';
import './taskForm.scss';

export default function NewTaskForm(props) {
    const { toDoList, setToDoList } = props;
    const [taskName, setTaskName] = useState('');
    const [desc, setDesc] = useState('');
    const [dueDate, setDueDate] = useState(moment().format('YYYY-MM-DD'));
    const [piority, setPiority] = useState(0);
    const [isError, setError] = useState(false);

    const handleAddTask = () => {
        if (taskName) {
            const toDoTask = {
                name: taskName,
                desc,
                piority,
                dueDate,
                isOpenDetail: false,
                status: false,
            }
            setToDoList([...toDoList, toDoTask]);
            reset();
            alert('Added new task successfully!')
        } else {
            setError(true);
        }
    }

    const reset = () => {
        setTaskName('');
        setDesc('');
        setDueDate(moment().format('YYYY-MM-DD'));
        setPiority(0);
    }

    const handleChangeTaskName = e => {
        setTaskName(e.target.value);
        setError(false)
    }

    const handleChangeDesc = e => {
        setDesc(e.target.value);
    }

    const handleChangeDate = e => {
        setDueDate(moment(e.target.valueAsNumber).format('YYYY-MM-DD'));
    }

    const handleChangePiority = e => {
        setPiority(e.target.value)
    }
    return <div className="content">
        <input className="task-title" placeholder="Add new task ..." onChange={handleChangeTaskName} value={taskName} />
        {isError && <div className="error-field">Task title is require field.</div>}
        <div className="desc">
            <span>Description</span>
            <textarea rows={6} onChange={handleChangeDesc} value={desc} />
        </div>
        <div className="picker">
            <div>
                <span>Due Date</span>
                <input value={dueDate} className="date-picker" type="date" min={moment().format('YYYY-MM-DD')} onChange={handleChangeDate} onKeyDown={() => false} />
            </div>
            <div>
                <span>Piority</span>
                <select value={piority} onChange={handleChangePiority}>
                    <option value={0}>Normal</option>
                    <option value={1}>High</option>
                    <option value={2}>Low</option>
                </select>
            </div>
        </div>
        <button onClick={handleAddTask}>Add</button>
    </div>
}