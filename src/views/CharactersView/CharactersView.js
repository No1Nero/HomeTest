import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import Searchbar from "components/Searchbar/Searchbar";
import RickAndMortyApi from "services/RickAndMortyApi";
import s from './CharactersView.module.css';

export default function CharactersView() {
    const [character, setCharacter] = useState([]);
    const [nextPage, setNextpage] = useState();
    const [prevPage, setPrevPage] = useState();

    useEffect(() => {
        RickAndMortyApi.getAllCharacters(({
            setCharacter, 
            setPrevPage, 
            setNextpage
        }));
    }, []);

    const goToPrevPage = () => {
        RickAndMortyApi.getListPage(({
            link: prevPage,
            setCharacter, 
            setPrevPage, 
            setNextpage
        }));
    };

    const goToNextPage = () => {
        RickAndMortyApi.getListPage(({
            link: nextPage,
            setCharacter, 
            setPrevPage, 
            setNextpage
        }));
    };

    const filterByName = characterName => {
        RickAndMortyApi.filterCharacterByName(({
            characterName,
            setCharacter, 
            setPrevPage, 
            setNextpage
        }));
    };

    return (
        <div>
            <Searchbar filterByName={filterByName} />
            <ul>
                {character.map(({id, name, status, image}) => (
                    <li className={s.char_element} key={id}>
                        <NavLink to={`/${id}`}><img className={s.char_img} alt={name} src={image} /></NavLink>
                        <div>
                            <NavLink className={s.char_name} to={`/${id}`}><p >{name}</p></NavLink>
                            <p>Status: {status}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={s.button_container}>
                <button onClick={goToPrevPage} className={s.list_button} disabled={!prevPage} type="button">←</button>
                <button onClick={goToNextPage} className={s.list_button} disabled={!nextPage} type="button">→</button>
            </div>
        </div>
    );
}