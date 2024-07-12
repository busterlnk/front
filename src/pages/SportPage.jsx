import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {getPadelGamesByUser, getTenisGamesByUser} from "../api/request/sportRequest";
import {useParams} from "react-router-dom";
import ModalNewPadelGame from "../components/ModalNewPadelGame";
import ModalNewTenisGame from "../components/ModalNewTenisGame";
import Grid from "../components/Grid";

const SportPage = () => {

    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])
    const [sport, setSport] = useState();
    const [showModal, setShowModal] = useState(false);

    const fetchUser = async () => {
        // await getSportById(id).then((responseSport) => {
        //     setSport(responseSport);
        // })
    }

    const fetchGames = async () => {
        const responseGames =
            id == 1 ? await getPadelGamesByUser(userData.id, id)
            : id == 2 ?? await getTenisGamesByUser(userData.id, id);

        if(responseGames.status == 200){
            setGames(responseGames.data);
        }else{
            setGames([])
        }
    };

    useEffect(() => {
        fetchUser()
        fetchGames();
    }, []);

    const ModalComponent = id === '1' ? ModalNewPadelGame : id === '2' ? ModalNewTenisGame : null;
    const sportName = id === '1' ? "Padel" : id === '2' ? "Tenis" : "Futbol";

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
