import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {createNewGame, getGamesByUser, getSports} from "../api/request/sportRequest";
import {Link, useNavigate, useParams} from "react-router-dom";

const SportPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getGamesByUser(userData.id, id);
            if(response.status == 200){
                setGames(response);
            }
        };

        // Llamamos a fetchData() cuando haya cambios en formData
        fetchData();
    }, []);

    const handleNewGame = async() => {
        // console.log(id, userData.id);
        await createNewGame(id, userData.id).then((response) => {
            if (response.status == 200){
                navigate('/sport/'+id+'/game/'+response.data.id);
            }
        })
    }


    return (
        <Container>
            <div>
                <h1>ID del deporte: {id}</h1>
                {/* Renderiza la información del deporte usando el id */}
                <Button onClick={handleNewGame}>Nuevo Partido</Button>
            </div>
            <Container>
                <Row className="mt-3">
                    <Col md={4}>
                        <Card>
                            <Card.Header>Deportes</Card.Header>
                            <ListGroup variant="flush">
                                {games && games.map((game) => (
                                    <Link key={game.id} to={'/game/'+game.id} className='nav-link'>
                                        <ListGroup.Item >{game.name}</ListGroup.Item>
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
        </Container>
    );
};

export default SportPage;
