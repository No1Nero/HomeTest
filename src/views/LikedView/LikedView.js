import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import RickAndMortyApi from "services/RickAndMortyApi";
import s from './LikedView.module.css';

export default function LikedView() {
    const [likedCharacters, setLikedCharacters] = useState();

    useEffect(() => {
        let likedIndex = [];
        let allIndex = Object.keys(localStorage);
        for (let i = 0; i < allIndex.length; i++) {
            if (localStorage.getItem(allIndex[i]) === 'like') {
                likedIndex.push(allIndex[i]);
            }
        }
        likedIndex = likedIndex.join(',');
        if (likedIndex.length > 0) {
            RickAndMortyApi.getLikedCharacters(({likedIndex, setLikedCharacters}));
        }
    }, []);

    return (
        <>
        {!!likedCharacters ?
        <div>
            <h1 className={s.liked_header}>Liked characters</h1>
            {Array.isArray(likedCharacters) ? 
                <ul>
                    {likedCharacters.map(({id, name, status, image}) => (
                        <li className={s.char_element} key={id}>
                            <NavLink to={`/liked/${id}`}><img className={s.char_img} alt={name} src={image} /></NavLink>
                            <div>
                                <NavLink className={s.char_name} to={`/liked/${id}`}><p >{name}</p></NavLink>
                                <p>Status: {status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            : 
                <section className={s.char_element}>
                    <NavLink to={`/liked/${likedCharacters.id}`}><img className={s.char_img} alt={likedCharacters.name} src={likedCharacters.image} /></NavLink>
                    <div>
                        <NavLink className={s.char_name} to={`/liked/${likedCharacters.id}`}><p >{likedCharacters.name}</p></NavLink>
                        <p>Status: {likedCharacters.status}</p>
                    </div>
                </section>
            }
        </div>
        :
        <h1 className={s.empty_message}>No liked characters yet</h1>
        }
        </>
    );
};