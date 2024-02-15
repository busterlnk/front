import React, {useEffect, useState} from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import {getSports} from "../api/request/sportRequest";
import {Link} from "react-router-dom";

const Home = () => {

    const [sports, setSports] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSports();
            setSports(response);
        };

        // Llamamos a fetchData() cuando haya cambios en formData
        fetchData();
    }, []);


    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Card>
                        <Card.Header>Deportes</Card.Header>
                        <ListGroup variant="flush">
                            {sports && sports.map((sport) => (
                                <Link key={sport.id} to={'/sports/'+sport.id} className='nav-link'>
                                    <ListGroup.Item >{sport.name}</ListGroup.Item>
                                </Link>
                            ))}
                            {/* Agrega más deportes aquí */}
                        </ListGroup>
                    </Card>
                </Col>
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
    );
};

export default Home;
