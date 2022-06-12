import React, {useState} from "react";
import s from './Searchbar.module.css';

export default function Searchbar({filterByName}) {
    const [filterValue, setFilterValue] = useState('');

    const handleChange = e => {
        setFilterValue(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        filterByName(filterValue);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input className={s.search_input} onChange={handleChange} type="text" placeholder="Search by name" value={filterValue}></input>
            <button className={s.search_button} type="submit">🔍</button>
        </form>  
        </>
    );
};