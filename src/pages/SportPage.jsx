import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {createNewGame, getGamesByUser, getSportById} from "../api/request/sportRequest";
import {Link, useNavigate, useParams} from "react-router-dom";

const SportPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])
    const [sport, setSport] = useState()

    useEffect(() => {
        const fetchData = async () => {
            await getSportById(id).then((responseSport) => {
                console.log(responseSport.name);
                setSport(responseSport);
            })

            const responseGames = await getGamesByUser(userData.id, id);
            console.log(responseGames);
            if(responseGames.status == 200){
                setGames(responseGames.data);
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
                <h1>{sport ? (sport.name) : ""}</h1>
                {/* Renderiza la información del deporte usando el id */}
                <Button onClick={handleNewGame}>Nuevo Partido</Button>
            </div>
            <Container>
                <Row className="mt-3">
                    <Col md={4}>
                        <Card>
                            <Card.Header>Partidos</Card.Header>
                            <ListGroup variant="flush">
                                {games && games.map((game) => (
                                    <Link key={game.id} to={'/sport/'+game.sport_id+'/game/'+game.game_id} className='nav-link'>
                                        <ListGroup.Item >{game.created_at}</ListGroup.Item>
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
