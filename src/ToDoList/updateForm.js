import React, { useState } from 'react';
import moment from 'moment';
import './updateForm.scss';

export default function UpdateForm(props) {
    const { toDoList, setToDoList, detailData, index } = props;
    const [taskName, setTaskName] = useState(detailData.name);
    const [desc, setDesc] = useState(detailData.desc);
    const [dueDate, setDueDate] = useState(detailData.dueDate);
    const [piority, setPiority] = useState(detailData.piority);
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
            let newList = toDoList.map((item, i) => {
                if (i === index) return toDoTask
                else return item
            })
            setToDoList(newList)
            alert('Updated task successfully!')
        } else {
            setError(true);
        }
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
        <button onClick={handleAddTask}>Update</button>
    </div>
}