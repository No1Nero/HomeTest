import React, {lazy, Suspense} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import s from './App.module.css';

const CharactersView = lazy(() => import ('../views/CharactersView/CharactersView'));
const ProfileView = lazy(() => import ('../views/ProfileView/ProfileView'));
const LikedView = lazy(() => import ('../views/LikedView/LikedView'));

export default function App() {
    return (
        <div className={s.wrapper}>
            <Suspense fallback={<p>Loading...</p>}>
                <header className={s.header_container}>
                    <NavLink className={s.main_header} to='/'>Rick and Morty Characters</NavLink>
                    <NavLink className={s.liked_header} to='/liked'>View liked</NavLink>
                </header>
                <Routes>
                    <Route path='/' element={<CharactersView />} />
                    <Route path='/:id' element={<ProfileView />} />
                    <Route path='/liked' element={<LikedView />} />
                    <Route path='/liked/:id' element={<ProfileView />} />
                </Routes>
            </Suspense>
        </div>
    );
};