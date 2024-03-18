import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {getGamesByUser, getSportById} from "../api/request/sportRequest";
import {Link, useParams} from "react-router-dom";
import ModalNewGame from "../components/ModalNewGame";

const SportPage = () => {

    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])
    const [sport, setSport] = useState();
    const [showModal, setShowModal] = useState(false);

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

        fetchData();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    return (
        <Container>
            <div>
                <h1>{sport ? (sport.name) : ""}</h1>
                <Button onClick={handleOpenModal}>Nuevo Partido</Button>
                <ModalNewGame
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    id={id}
                    userData={userData}
                />
            </div>
            <Container>
                <Row className="mt-3">
                    <Col md={6}>
                        <Card>
                            <Card.Header>Partidos</Card.Header>
                            <ListGroup variant="flush">
                                {games && games.map((game) => (
                                    <Link key={game.id} to={'/sport/' + game.sport_id + '/game/' + game.game_id} className='nav-link'>
                                        <ListGroup.Item >{game.player_one+' / '+game.player_two+' ('+game.created_at+')'}</ListGroup.Item>
                                    </Link>
                                ))}
                                {/* Agrega más deportes aquí */}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={6}>
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
