import React from 'react';
import reactDom from 'react-dom';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';

reactDom.render(
    <BrowserRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </BrowserRouter>, 
    document.querySelector("#root"),
);