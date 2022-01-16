import React, { ChangeEvent, useState } from 'react';
import './todoItem.css';

export type Todo = {
    id:string,
    value:string,
    completed:boolean
};

export const TodoItem = (
    props: {
        todo: Todo,
        checked:boolean,
        onChecked:() => void,
        onSave:(value:string) => void,
        onDelItem:() =>void
    }
) => {
    const [readOnly, setReadOnly] = useState(true);
    const [value, setValue] = useState(props.todo.value);

    const handleDoubleClick = () => {
        setReadOnly(false);
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        setReadOnly(true);
        value === '' ? props.onDelItem() : props.onSave(value);
    };

    const handleKeyDown= (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    }

    return (
        <label className='todo-show-item'>
            {readOnly &&
                <input
                    className='todo-show-checkbox'
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.onChecked}
                />
            }
            <input
                className={`todo-show-input ${props.checked ? 'todo-completed' : '' } ${readOnly ? '' : 'todo-show-active'}`}
                type="text"
                value={value}
                onDoubleClick={handleDoubleClick}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                readOnly={readOnly}
            />
            <input className='todo-show-delete' type="button" value='X' onClick={props.onDelItem}/>
        </label>
    );
};