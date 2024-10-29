import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {getGamesByUser, getSportById} from "../api/request/sportRequest";
import {Link, useParams} from "react-router-dom";
import Grid from "../components/Grid";
import {gethistoryGameByUser} from "../api/request/historyRequest";
import ModalNewPadelTournament from "../components/modals/ModalNewPadelTournament";

const TournamentsPage = () => {

    const { sportid } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])
    const [sport, setSport] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getSportById(sportid).then((responseSport) => {
                console.log(responseSport.name);
                setSport(responseSport);
            })

            const responseGames = await gethistoryGameByUser(userData.id, sportid);
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
            <div className='sport-container'>
                <h1>{sport ? (sport.name) : ""}</h1>
                <Button className='create-game-button' onClick={handleOpenModal}>Nuevo Torneo</Button>
                <ModalNewPadelTournament
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    id={sportid}
                    userData={userData}
                />
            </div>

            <Row className="mt-3">
                <Col md={12}>
                    <Card>
                        <Grid data={games} history={true}></Grid>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TournamentsPage;
