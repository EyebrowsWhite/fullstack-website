import React, { ChangeEvent, FormEvent, useEffect, useReducer, useState } from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import { TodoItem, Todo } from './TodoItem';

const initialTab = { name: 'ALL' };

const reducer = (_tab:any, action:any) => {
    switch (action.type) {
        case 'ALL':
            return { name: 'ALL' };
        case 'PENDING':
            return { name: 'PENDING' };
        case 'COMPLETED':
            return { name: 'COMPLETED' };
        default:
            throw new Error();
    }
}

const ToDo = () => {
    const toolTodos:Todo[] = JSON.parse(localStorage.getItem('tool-todo') || '[]');
    const [store, setStore] = useState(toolTodos);
    const [value, setValue] = useState('');
    const [length, setLength] = useState(0);
    const [tab, dispatch] = useReducer(reducer, initialTab);

    useEffect(() => {
        const uncompleted = store.filter((val) => val.completed === false);
        setLength(uncompleted.length);
    }, [store]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value !== '') {
            const todo = {
                id: nanoid(),
                value,
                completed: false
            };
            const todos = [...store, todo];
            setStore(todos);
            localStorage.setItem('tool-todo', JSON.stringify(todos));
            setValue('');
        }
    };

    const handleDelCompleted = () => {
        const uncompleted = store.filter((val) => val.completed === false);
        setStore(uncompleted);
        localStorage.setItem('tool-todo', JSON.stringify(uncompleted));
    };

    const handleChecked = (id:string) => {
        const toggledTodos = store.map((val) => {
            if (val.id === id) {
                return { ...val, completed: !val.completed };
            }
            return val;
        });
        setStore(toggledTodos);
        localStorage.setItem('tool-todo', JSON.stringify(toggledTodos));
    };

    const handleSaveItem = (id:string, v:string) => {
        const changedTodos = store.map((val) => {
            if (val.id === id && v !== '') {
                return { ...val, value: v };
            }
            return val;
        });
        setStore(changedTodos);
        localStorage.setItem('tool-todo', JSON.stringify(changedTodos));
    };

    const handleDelItem = (id:string) => {
        const remainTodos = store.filter((val) => val.id !== id);
        setStore(remainTodos);
        localStorage.setItem('tool-todo', JSON.stringify(remainTodos));
    };

    return (
        <div className='todo-box'>
            <h2 className='todo-name'>T O D O</h2>
            <form className='todo-input-box' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='todo-input'
                    value={value}
                    onChange={handleChange}
                    placeholder={'???????????????????????????'}
                    autoFocus
                />
            </form>
            <div className='todo-show-box'>
                <div className='todo-show-content'>
                    {store.map((item) => {
                        switch (tab.name) {
                            case 'PENDING':
                                return item.completed === false && 
                                    <TodoItem
                                        key={item.id}
                                        todo={item}
                                        checked={item.completed}
                                        onChecked={() => {handleChecked(item.id)}}
                                        onSave={(val) => {handleSaveItem(item.id, val)}}
                                        onDelItem={() => {handleDelItem(item.id)}}
                                    />;
                            case 'COMPLETED':
                                return item.completed === true &&
                                    <TodoItem
                                        key={item.id}
                                        todo={item}
                                        checked={item.completed}
                                        onChecked={() => {handleChecked(item.id)}}
                                        onSave={(val) => {handleSaveItem(item.id, val)}}
                                        onDelItem={() => {handleDelItem(item.id)}}
                                    />;
                            default:
                                return  <TodoItem
                                            key={item.id}
                                            todo={item}
                                            checked={item.completed}
                                            onChecked={() => {handleChecked(item.id)}}
                                            onSave={(val) => {handleSaveItem(item.id, val)}}
                                            onDelItem={() => {handleDelItem(item.id)}}
                                        />;
                        }
                    })}
                </div>
                {store.length > 0 &&
                    <>
                    <ul className='todo-show-tab'>
                        <li className='todo-show-all' onClick={() => dispatch({ type: 'ALL' })}>??????</li>
                        <li className='todo-show-pending' onClick={() => dispatch({ type: 'PENDING' })}>??????</li>
                        <li className='todo-show-completed' onClick={() => dispatch({ type: 'COMPLETED' })}>?????????</li>
                    </ul>
                    <div className='todo-show-feature'>
                        <p>?????? <span>{length}</span> ?????????</p>
                        <button type='button' onClick={handleDelCompleted}>???????????????</button>
                    </div>
                    </>
                }
            </div>
        </div>
    );
}

export default ToDo;