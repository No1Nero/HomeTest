import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import RickAndMortyApi from "services/RickAndMortyApi";
import s from './ProfileView.module.css';

export default function ProfileView() {
    const {id} = useParams();

    const [likedStatus, setLikedStatus] = useState(localStorage.getItem(id));
    const [episodesNumber, setEpisodesNumber] = useState();
    const [characterInfo, setCharacterInfo] = useState([]);
    const {name, status, species, gender, location, episode, created, image} = characterInfo;

    useEffect(() => {
        RickAndMortyApi.getSingleCharacter(({
            id,
            setCharacterInfo,
        }));
    }, [id]);

    useEffect(() => {
        if (!!episode) {
            const episodesArray = episode.map(link => link.split('/').filter(part => part > 0).join(''));
            const episodesString = episodesArray.join(',');
            RickAndMortyApi.getEpisodes(({episodesString, setEpisodesNumber}));
        }
    }, [episode]);

    const likeCharacter = () => {
        localStorage.setItem(id, 'like');
        setLikedStatus(localStorage.getItem(id));
    };

    const dislikeCharacter = () => {
        localStorage.setItem(id, 'dislike');
        setLikedStatus(localStorage.getItem(id));
    };

    return (
        <div className={s.profile_container}>
            <div className={s.header_nav}>
                <img className={s.profile_img} alt={name} src={image} />
                <div className={s.header_text_container}>
                    <h2 className={s.header_name}>{name}</h2>
                    <p className={s.header_status}>Status: {status}</p>
                    <button className={s.like_buttons} onClick={likeCharacter} type="button" disabled={likedStatus === 'like'}>Like</button>
                    <button className={s.like_buttons} onClick={dislikeCharacter} type="button" disabled={likedStatus === 'dislike'}>Dislike</button>
                </div>
            </div>
            <div className={s.info_div}>
                <section className={s.info_section}>
                    <p className={s.info_name}>Gender:</p>
                    <p className={s.info_value}>{gender}</p>
                </section>
                <section className={s.info_section}>
                    <p className={s.info_name}>Species:</p>
                    <p className={s.info_value}>{species}</p>
                </section>
                <section className={s.info_section}>
                    <p className={s.info_name}>Episode:</p>
                    {!!episodesNumber && <p className={s.info_value}>{Array.isArray(episodesNumber) ? episodesNumber.map(({episode}) => `${episode}, `) : episodesNumber.episode}</p>}
                </section>
                <section className={s.info_section}>
                    <p className={s.info_name}>Location:</p>
                    <p className={s.info_value}>{!!location && location.name}</p>
                </section>
                <section className={s.info_section}>
                    <p className={s.info_name}>Created:</p>
                    <p className={s.info_value}>{created}</p>
                </section>
            </div>
        </div>
    );
};