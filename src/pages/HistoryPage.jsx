import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import Grid from "../components/Grid";
import {getHistoryGamesByUser} from "../api/request/historyRequest";

const HistoryPage = () => {

    const { sportid } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [games, setGames] = useState([])
    const [sport, setSport] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const sportName = sportid == 1 ? 'padel' : sportid == 2 ? 'tenis' : sportid == 3 ? 'squash' : '';
            setSport(sportName);

            const responseGames = await getHistoryGamesByUser(userData.id, sportName);
            if(responseGames.status == 200){
                setGames(responseGames.data);
            }
        };

        fetchData();
    }, []);


    return (
        <Container>
            <div className='sport-container'>
                <h1>{sport ? `Historial de ${sport}` : "Historial"}</h1>
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

export default HistoryPage;
