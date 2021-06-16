import React, { useState, useEffect } from 'react';
import UpdateForm from './updateForm';
import './index.scss';

export default function ToDoList(props) {
    const { toDoList, setToDoList } = props;
    const [taskList, setTaskList] = useState([]);
    const [isShowBulkAction, setShowBulkAction] = useState(false);

    useEffect(() => {
        let temp = toDoList.sort(function (a, b) {
            let dateA = new Date(a.dueDate);
            let dateB = new Date(b.dueDate);
            return dateA - dateB;
        });
        setTaskList(temp);
    }, [toDoList])

    const handleShowDetail = index => {
        const newList = toDoList.map((item, i) => {
            if (i === index) return {
                ...item,
                isOpenDetail: !item.isOpenDetail,
            }
            return item
        })
        setToDoList(newList);
    }

    const handleRemoveItem = index => {
        const newList = toDoList.filter((item, i) => index !== i)
        setToDoList(newList)
    }

    const handleChangeCheckbox = (e, index) => {
        const newList = taskList.map((item, i) => {
            if (i === index) return {
                ...item,
                status: e.target.checked,
            }
            return item
        })
        setTaskList(newList)
    }

    useEffect(() => {
        const index = taskList.findIndex(item => item.status === true)
        if (index !== -1) {
            setShowBulkAction(true)
        } else {
            setShowBulkAction(false)
        }
    }, [taskList])

    const removeAll = () => {
        const newList = taskList.filter(item => !item.status)
        setTaskList(newList)
    }

    const handleSearch = e => {
        let newList;
        if (e.target.value) {
            newList = toDoList.sort(function (a, b) {
                let dateA = new Date(a.dueDate);
                let dateB = new Date(b.dueDate);
                return dateA - dateB;
            }).filter(item => item.name.includes(e.target.value.trim()));
        } else {
            newList = toDoList.sort(function (a, b) {
                let dateA = new Date(a.dueDate);
                let dateB = new Date(b.dueDate);
                return dateA - dateB;
            })
        }
        setTaskList(newList)
    }

    return <div className="todo-list">
        <div className="title">
            To Do List
        </div>
        <div className="content">
            <input placeholder="Search ..." className="search-bar" onChange={handleSearch} />
            <div className="to-do-list">
                {taskList?.length ?
                    taskList.map((item, index) => <div key={index} className="to-do-item">
                        <div className="overview">
                            <input type="checkbox" className="checkbox" checked={item.status} onChange={e => handleChangeCheckbox(e, index)} />
                            <div className="to-do-name">{item.name}</div>
                            <div className="action-btn">
                                <button className="detail-btn" onClick={() => handleShowDetail(index)}>Detail</button>
                                <button className="remove-btn" onClick={() => handleRemoveItem(index)}>Remove</button>
                            </div>
                        </div>
                        {item.isOpenDetail && <div className="detail">
                            <UpdateForm toDoList={toDoList} setToDoList={setToDoList} detailData={item} index={index} />
                    </div>}
                    </div>) : null
                }
            </div>
        </div>
        {isShowBulkAction && <div className="bulk-action">
            <div>Bulk action: </div>
            <div className="action-btn">
                <button className="done-btn">
                    Done
                </button>
                <button className="remove-btn" onClick={removeAll}>
                    Remove
                </button>
            </div>
        </div>}
    </div>
}