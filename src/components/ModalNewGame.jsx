import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createNewGame} from "../api/request/sportRequest";
import {useNavigate} from "react-router-dom";

const ModalNewGame = ({ showModal, handleCloseModal, id, userData}) => {
    const navigate = useNavigate();
    const [gameType, setGameType] = useState('individual'); // Estado para almacenar el tipo de juego seleccionado
    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)


    const handleNewGame = async() => {
        const formData = new FormData();

        formData.append('userid', userData.id)
        formData.append('sportid', id);
        formData.append('player_one', player1);
        formData.append('player_two', player2);

        if(gameType == 'individual'){
            formData.append('individual', true);
        }else{
            formData.append('individual', true);
        }

        if(player1 !== null || player2 !== null){
            await createNewGame(formData).then((response) => {
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

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo Partido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Tipo de Juego</Form.Label>
                        <div>
                            <Form.Check
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
                            <Form.Check
                                inline
                                type="radio"
                                label="Equipos"
                                value="equipos"
                                checked={gameType === 'equipos'}
                                onChange={handleGameTypeChange}
                            />
                        </div>
                    </Form.Group>

                    {gameType === 'individual' && (
                        <div>
                            <Form.Group controlId="player1">
                                <Form.Label>Jugador 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del Jugador 1"
                                    value={player1}
                                    onChange={(event) => setPlayer1(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="player2">
                                <Form.Label>Jugador 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del Jugador 2"
                                    value={player2}
                                    onChange={(event) => setPlayer2(event.target.value)}/>
                            </Form.Group>
                        </div>
                    )}

                    {gameType === 'parejas' && (
                        <div>
                            <Form.Group controlId="partner1">
                                <Form.Label>Pareja 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre de la Pareja 1"
                                    value={player1}
                                    onChange={(event) => setPlayer1(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="partner2">
                                <Form.Label>Pareja 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre de la Pareja 2"
                                    value={player2}
                                    onChange={(event) => setPlayer2(event.target.value)}/>
                            </Form.Group>
                        </div>
                    )}

                    {gameType === 'equipos' && (
                        <div>
                            <Form.Group controlId="team1">
                                <Form.Label>Equipo 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del Equipo 1"
                                    value={player1}
                                    onChange={(event) => setPlayer1(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="team2">
                                <Form.Label>Equipo 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del Equipo 2"
                                    value={player2}
                                    onChange={(event) => setPlayer2(event.target.value)}/>
                            </Form.Group>
                        </div>
                    )}

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

export default ModalNewGame;
