import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {getGamesByUser, getPadelGamesByUser, getTenisGamesByUser} from "../api/request/sportRequest";
import {useParams} from "react-router-dom";
import ModalNewPadelGame from "../components/modals/ModalNewPadelGame";
import ModalNewTenisGame from "../components/modals/ModalNewTenisGame";
import Grid from "../components/Grid";
import ModalNewSquashGame from "../components/modals/ModalNewSquashGame";

const SportPage = () => {

    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])
    const [sport, setSport] = useState();
    const [showModal, setShowModal] = useState(false);

    const fetchGames = async () => {
        const sport = id == 1 ? 'padel' : id == 2 ? 'tenis' : '';
        console.log(sport);

        const responseGames =await getGamesByUser(userData.id, sport);
        if(responseGames.status == 200){
            setGames(responseGames.data);
        }else{
            setGames([])
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const ModalComponent = id === '1' ? ModalNewPadelGame : id === '2' ? ModalNewTenisGame :  id === '3' ? ModalNewSquashGame : null
    const sportName = id === '1' ? "Padel" : id === '2' ? "Tenis" : id === '3' ? 'Squash' : 'futbol';

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Container>
            <div className='sport-container'>
                <h1>{sportName}</h1>
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
                            <Grid data={games} history={false} updateData={fetchGames}></Grid>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default SportPage;
