import axios from "axios"

const getAllCharacters = ({setCharacter, setPrevPage, setNextpage}) => {
    axios.get('https://rickandmortyapi.com/api/character')
    .then(({data}) => {
        setCharacter(data.results);
        setPrevPage(data.info.prev);
        setNextpage(data.info.next);
    });
};

const getListPage = ({link, setCharacter, setPrevPage, setNextpage}) => {
    axios.get(`${link}`)
    .then(({data}) => {
        setCharacter(data.results);
        setPrevPage(data.info.prev);
        setNextpage(data.info.next);
    });
};

const filterCharacterByName = ({characterName, setCharacter, setPrevPage, setNextpage}) => {
    axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
    .then(({data}) => {
        setCharacter(data.results);
        setPrevPage(data.info.prev);
        setNextpage(data.info.next);
    });
};

const getSingleCharacter = ({id, setCharacterInfo}) => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(({data}) => setCharacterInfo(data));
};

const getEpisodes = ({episodesString, setEpisodesNumber}) => {
    axios.get(`https://rickandmortyapi.com/api/episode/${episodesString}`)
    .then(({data}) => setEpisodesNumber(data));
};

const getLikedCharacters = ({likedIndex, setLikedCharacters}) => {
    axios.get(`https://rickandmortyapi.com/api/character/${likedIndex}`)
    .then(({data}) => setLikedCharacters(data));
};

export default {
    getAllCharacters, 
    getListPage, 
    filterCharacterByName, 
    getSingleCharacter, 
    getEpisodes, 
    getLikedCharacters};