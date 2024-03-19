import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import {getGamesByUser, getGameScore, getSports} from "../api/request/sportRequest";
import {Link, useParams} from "react-router-dom";

import '../styles/game.css';

const GamePage = () => {

    const { gameid } = useParams();
    const [score, setScore] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await getGameScore(gameid).then((response)=>{
                if(response.status == 200){
                    setScore(response.data);
                }
            })

        };
        fetchData();
    }, []);


    return (
        <Container>
            <Container>
                <Row className="mt-3">
                    <Col md={12}>
                        <Row>
                            <Col md={12}>
                                <Card>
                                    <Card.Header>Partido </Card.Header>
                                    <Card.Body style={{
                                        backgroundColor:'#00ff00',
                                        color: '#fff',
                                        fontSize: '40px',
                                        textAlign: '-webkit-left'}}>
                                        {score && (
                                            <table className="tabla-puntos-1">
                                                <tbody>
                                                <tr>
                                                    {score.playerOne && score.saque && (
                                                        <th className="parejas">{score.playerOne.toUpperCase()}</th>
                                                    )}
                                                    <th className="saque">{score.saque === 1 ? '🟡' : ''}</th>
                                                    {score.p11s && <th className="set">{score.p11s}</th>}
                                                    {score.p12s && <th className="set">{score.p12s}</th>}
                                                    {score.p13s && <th className="set">{score.p13s}</th>}
                                                    {score.p1ps && (score.points === 'ORO' ? <th className="oro">{score.p1ps}</th>
                                                        : score.points === 'TBR' ? <th className="tbr">{score.p1ps}</th>
                                                        : <th className="puntos">{score.p1ps}</th>)
                                                    }
                                                </tr>
                                                <tr>
                                                    {score.playerTwo && score.saque && (
                                                        <th className="parejas">{score.playerTwo.toUpperCase()}</th>
                                                    )}
                                                    <th className="saque">{score.saque === 2 ? '🟡' : ''}</th>
                                                    {score.p21s && <th className="set">{score.p21s}</th>}
                                                    {score.p22s && <th className="set">{score.p22s}</th>}
                                                    {score.p23s && <th className="set">{score.p23s}</th>}
                                                    {score.p2ps && (score.points === 'ORO' ? <th className="oro">{score.p2ps}</th>
                                                        : score.points === 'TBR' ? <th className="tbr">{score.p2ps}</th>
                                                        : <th className="puntos">{score.p2ps}</th>)
                                                    }
                                                </tr>
                                                </tbody>
                                            </table>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12}>
                                <Card>
                                    <Card.Header>Botonera</Card.Header>
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
