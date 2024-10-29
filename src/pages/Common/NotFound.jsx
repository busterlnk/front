import React, {useState} from 'react';
import {Helmet} from 'react-helmet'

const NotFound = () => {

    return (
        <>
            <Helmet>
                <title>404 Página no encontrada</title>
            </Helmet>
            <div>
                <h1>404 Pagina no encontrada</h1>
            </div>
        </>
    );
}

export default NotFound;