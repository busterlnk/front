import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {getGamesByUser, getSportById} from "../api/request/sportRequest";
import {Link, useParams} from "react-router-dom";
import ModalNewPadelGame from "../components/ModalNewPadelGame";
import ModalNewTenisGame from "../components/ModalNewTenisGame";
import Grid from "../components/Grid";

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

    const ModalComponent = sport?.name === 'Padel' ? ModalNewPadelGame : sport?.name === 'Tenis' ? ModalNewTenisGame : null;


    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    return (
        <Container>
            <div className='sport-container'>
                <h1>{sport ? (sport.name) : ""}</h1>
                <Button className='create-game-button' onClick={handleOpenModal}>Nuevo Partido</Button>
                {ModalComponent && (
                    <ModalComponent
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        id={id}
                        userData={userData}
                    />
                )}
            </div>
            <Container>
                <Row className="mt-3">
                    <Col md={12}>
                        <Card>
                            <Grid data={games} history={false}></Grid>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default SportPage;
