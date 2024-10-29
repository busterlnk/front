import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createNewGame} from "../../api/request/sportRequest";
import {useNavigate} from "react-router-dom";

const ModalNewSquashGame = ({ showModal, handleCloseModal, id, userData}) => {
    const navigate = useNavigate();
    const [gameType, setGameType] = useState('individual');
    const [games, setGames] = useState(3);
    const [points, setPoints] = useState(12);
    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)


    const handleNewGame = async() => {
        const formData = new FormData();

        formData.append('userid', userData.id)
        formData.append('player_one', player1);
        formData.append('player_two', player2);

        if(gameType == 'individual'){
            formData.append('individual', true);
        }else{
            formData.append('individual', false);
        }

        if(player1 !== null || player2 !== null){
            await createNewGame(formData, 'squash').then((response) => {
                if (response.status == 200){
                    navigate('/sport/'+id+'/game/'+response.data.id);
                }
            })
        }else{
            alert('Por favor completar los nombres');
        }

    }

    const handleGameTypeChange = (event) => {
        setGameType(event.target.value);
    }
    const handleGamesChange = (event) => {
        console.log(event);
        setGames(event.target.value);
    }
    const handlePointsChange = (event) => {
        console.log(event.target.value);
        setPoints(event.target.value);
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo Partido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className={'mt-4'}>Tipo de Juego</Form.Label>
                        <div>
                            <Form.Check
                                className={'mt-2'}
                                inline
                                type="radio"
                                label="Individual"
                                value="individual"
                                checked={gameType === 'individual'}
                                onChange={handleGameTypeChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Parejas"
                                value="parejas"
                                checked={gameType === 'parejas'}
                                onChange={handleGameTypeChange}
                            />
                        </div>
                    </Form.Group>

                    {gameType === 'individual' && (
                        <div>
                            <Form.Group className={'mt-4'} controlId="player1">
                                <Form.Label>Jugador 1</Form.Label>
                                <Form.Control
                                    className={'mt-2'}
                                    type="text"
                                    placeholder="Nombre del Jugador 1"
                                    value={player1}
                                    onChange={(event) => setPlayer1(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className={'mt-4'} controlId="player2">
                                <Form.Label>Jugador 2</Form.Label>
                                <Form.Control
                                    className={'mt-2'}
                                    type="text"
                                    placeholder="Nombre del Jugador 2"
                                    value={player2}
                                    onChange={(event) => setPlayer2(event.target.value)}/>
                            </Form.Group>
                        </div>
                    )}

                    {gameType === 'parejas' && (
                        <div>
                            <Form.Group className={'mt-4'} controlId="partner1">
                                <Form.Label>Pareja 1</Form.Label>
                                <Form.Control
                                    className={'mt-2'}
                                    type="text"
                                    placeholder="Nombre de la Pareja 1"
                                    value={player1}
                                    onChange={(event) => setPlayer1(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className={'mt-4'} controlId="partner2">
                                <Form.Label>Pareja 2</Form.Label>
                                <Form.Control
                                    className={'mt-2'}
                                    type="text"
                                    placeholder="Nombre de la Pareja 2"
                                    value={player2}
                                    onChange={(event) => setPlayer2(event.target.value)}/>
                            </Form.Group>
                        </div>
                    )}


                    <Form.Group>
                        <Form.Label className={'mt-4'}>Juegos</Form.Label>
                        <div>
                            <Form.Check
                                className={'mt-2'}
                                inline
                                type="radio"
                                label="3"
                                value={3}
                                checked={games === '3'}
                                onChange={handleGamesChange}
                            />
                            <Form.Check
                                className={'mt-2'}
                                inline
                                type="radio"
                                label="5"
                                value={5}
                                checked={games === '5'}
                                onChange={handleGamesChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className={'mt-4'}>Puntos</Form.Label>
                        <div>
                            <Form.Check
                                className={'mt-2'}
                                inline
                                type="radio"
                                label="12"
                                value={12}
                                checked={points === '12'}
                                onChange={handlePointsChange}
                            />
                            <Form.Check
                                className={'mt-2'}
                                inline
                                type="radio"
                                label="15"
                                value={15}
                                checked={points === '15'}
                                onChange={handlePointsChange}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleNewGame}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNewSquashGame;
