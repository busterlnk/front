import React, {useEffect, useState} from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import {getSports} from "../api/request/sportRequest";
import {Link, useParams} from "react-router-dom";

const SportPage = () => {

    const { id } = useParams();
    console.log(id);


    return (
        <Container>
            <div>
                <h1>Detalles del deporte</h1>
                {/* Renderiza la información del deporte usando el id */}
                <p>ID del deporte: {id}</p>
            </div>
        </Container>
    );
};

export default SportPage;
