import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {getGamesByUser, getSports} from "../api/request/sportRequest";
import {Link, useParams} from "react-router-dom";

const GamePage = () => {

    const { id } = useParams();
    // const [games, setGames] = useState([])
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const userData = JSON.parse(localStorage.getItem('userData'));
    //         const response = await getGamesByUser(userData.id, id);
    //         if(response.status == 200){
    //             setGames(response);
    //         }
    //     };
    //
    //     // Llamamos a fetchData() cuando haya cambios en formData
    //     fetchData();
    // }, []);


    return (
        <Container>
            <Container>
                <Row className="mt-3">
                    <Col md={8}>
                        <Row>
                            <Col md={12}>
                                <Card>
                                    <Card.Header>Último Partido</Card.Header>
                                    <Card.Body>
                                        {/* Contenido del último partido */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12}>
                                <Card>
                                    <Card.Header>Estadísticas</Card.Header>
                                    <Card.Body>
                                        {/* Contenido de estadísticas */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default GamePage;
