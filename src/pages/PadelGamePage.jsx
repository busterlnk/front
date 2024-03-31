import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {getGameScore} from "../api/request/sportRequest";
import {useParams} from "react-router-dom";
import '../styles/game.css';
import {resetPadelGame, sendPadelGameScore, sendPadelGameWinner} from "../api/request/scoreRequest";

const PadelGamePage = () => {

    const { gameid } = useParams();
    const [score, setScore] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await getGameScore(gameid).then((response)=>{
            if(response.status === 200){
                console.log(response.data);
                setScore(response.data);
            }
        })

    };

    const handleName = async(e,player) => {
        let newGame = {...score};
        newGame[player] = e.target.value
        setScore(newGame);
        await sendPadelGameScore(gameid,newGame);
    }

    const handleServe = async(player) => {
        let newGame = {...score};
        newGame['saque'] = player;
        setScore(newGame);
        await sendPadelGameScore(gameid, newGame);
    }

    const handleGame = async (player, action) => {
        let newGame = {...score};
        const otherPlayer = player === 1 ? 2: 1;

        const currentSet = checkSet(newGame);

        if (action === 'increase') {
            if(!newGame['p'+otherPlayer+currentSet]){
                newGame['p'+otherPlayer+currentSet] = 0
            }
                // Incrementar juegos y verificar si el set termina
            if(newGame['p'+player+currentSet]){
                newGame['p'+player+currentSet]++;
            }else{
                newGame['p'+player+currentSet] = 1;
                if(!newGame['p'+otherPlayer+currentSet]){
                    newGame['p'+otherPlayer+currentSet] = 0;
                }
            }
        } else if (action === 'decrease' && newGame['p'+player+currentSet] > 0) {
            newGame['p'+player+currentSet]--
        }

        if(newGame.p1ps !== 0 || newGame.p2ps !== 0){
            newGame['p1ps'] = 0;
            newGame['p2ps'] = 0;
        }

        setScore(newGame);
        await sendPadelGameScore(gameid, newGame);
    };

    const sendWinner = async(game) => {
        let firstCouple = 0;
        // game['p2ps'] = null;
        // game['p1ps'] = null;
        firstCouple = game['p11s'] > game['p21s'] ? firstCouple+1 : firstCouple;
        firstCouple = game['p12s'] > game['p22s'] ? firstCouple+1 : firstCouple;
        firstCouple = game['p13s'] > game['p23s'] ? firstCouple+1 : firstCouple;
        game['winner'] = firstCouple >= 2 ? game.playerOne : game.playerTwo;
        sendPadelGameWinner(gameid, game);
    }

    const checkSet = (newGame) => {
        let currentSet = 0
        console.log(newGame);
        if((newGame.p11s !== 6 && newGame.p21s !== 6)){
            currentSet = '1s';
        }else if((newGame.p12s !== 6 && newGame.p22s !== 6)){
            currentSet = '2s'
        }else if((newGame.p13s !== 6 && newGame.p23s !== 6)){
            currentSet = '3s';
        }else{
            currentSet = 'end';
            sendWinner(newGame);
        }
        return currentSet;
    }

    const handlePoint = async (player, action) => {
        let newGame = {...score};
        const otherPlayer = player === 1 ? 2: 1;
        const pointsSequence = [15, 30, 40];
        const playerPoints = player === 1 ? 'p1ps' : 'p2ps';

        const currentSet = checkSet(newGame);
        if(currentSet === 'end'){
            return;
        }

        if (action === 'increase') {
            let currentIndex = pointsSequence.indexOf(newGame[playerPoints]);
            newGame[playerPoints] = currentIndex === 2 ? 0 : pointsSequence[currentIndex + 1];
            if(!newGame['p'+otherPlayer+'ps']){
                newGame['p'+otherPlayer+'ps'] = 0
            }else{
                newGame['p'+otherPlayer+'ps'] = currentIndex === 2 ? 0 : newGame['p'+otherPlayer+'ps'];
            }
            if (currentIndex === 2) {
                // Incrementar juegos y verificar si el set termina
                if(newGame['p'+player+currentSet]){
                    newGame['p'+player+currentSet]++;
                }else{
                    newGame['p'+player+currentSet] = 1;
                    if(!newGame['p'+otherPlayer+currentSet]){
                        newGame['p'+otherPlayer+currentSet] = 0;
                    }
                }
            }
        } else if (action === 'decrease' && newGame[playerPoints] > 0) {
            let currentIndex = pointsSequence.indexOf(newGame[playerPoints]);
            newGame[playerPoints] = currentIndex === 0 ? 0 : pointsSequence[currentIndex - 1]; // Decrementar puntos
        }
        setScore(newGame);
        await sendPadelGameScore(gameid, newGame);
    };

    const handleReset = async() => {
        await resetPadelGame(gameid).then((response) => {
            fetchData();
        });
    }


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
                                                    {score.p11s >= 0  && <th className="set">{score.p11s}</th>}
                                                    {score.p12s >= 0  && <th className="set">{score.p12s}</th>}
                                                    {score.p13s >= 0  && <th className="set">{score.p13s}</th>}
                                                    {score.p1ps >= 0 && (score.mode === 'oro' ? <th className="oro">{score.p1ps}</th>
                                                        : score.mode === 'tbr' ? <th className="tbr">{score.p1ps}</th>
                                                        : <th className="puntos">{score.p1ps}</th>)
                                                    }
                                                </tr>
                                                <tr>
                                                    {score.playerTwo && score.saque && (
                                                        <th className="parejas">{score.playerTwo.toUpperCase()}</th>
                                                    )}
                                                    <th className="saque">{score.saque === 2 ? '🟡' : ''}</th>
                                                    {score.p21s >= 0 && <th className="set">{score.p21s}</th>}
                                                    {score.p22s >= 0 && <th className="set">{score.p22s}</th>}
                                                    {score.p23s >= 0 && <th className="set">{score.p23s}</th>}
                                                    {score.p2ps >= 0 && (score.mode === 'oro' ? <th className="oro">{score.p2ps}</th>
                                                        : score.mode === 'tbr' ? <th className="tbr">{score.p2ps}</th>
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
                        { !score.winner &&
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Card>
                                        <Card.Header>Botonera</Card.Header>
                                        <Card.Body>
                                            <div className='buttons-container'>
                                                <div>
                                                    <p>Player 1</p>
                                                    <input type="text" value={score.playerOne} onChange={(e) => handleName(e,'playerOne')} className='name-player'/>
                                                </div>
                                                <div className='set-container'>
                                                    <p>Serve</p>
                                                    <Button onClick={() => handleServe(1)}>🟡</Button>
                                                </div>
                                                <div className='set-container'>
                                                    <p>Games</p>
                                                    <Button onClick={() => handleGame(1, 'decrease')}>-</Button>
                                                    <Button onClick={() => handleGame(1, 'increase')}>+</Button>
                                                </div>
                                                <div className='set-container'>
                                                    <p>Points</p>
                                                    <Button onClick={() => handlePoint(1, 'decrease')}>-</Button>
                                                    <Button onClick={() => handlePoint(1, 'increase')}>+</Button>
                                                </div>
                                            </div>
                                            <div className='buttons-container'>
                                                <div>
                                                    <p>Player 2</p>
                                                    <input type="text" value={score.playerTwo} onChange={(e) => handleName(e,'playerTwo')} className='name-player'/>
                                                </div>
                                                <div className='set-container'>
                                                    <Button onClick={() => handleServe(2)}>🟡</Button>
                                                </div>
                                                <div className='set-container'>
                                                    <Button onClick={() => handleGame(2, 'decrease')}>-</Button>
                                                    <Button onClick={() => handleGame(2, 'increase')}>+</Button>
                                                </div>
                                                <div className='set-container'>
                                                    <Button onClick={() => handlePoint(2, 'decrease')}>-</Button>
                                                    <Button onClick={() => handlePoint(2, 'increase')}>+</Button>
                                                </div>
                                            </div>
                                            <div className='buttons-container'>
                                                <Button onClick={handleReset}>Reset</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default PadelGamePage;
