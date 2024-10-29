import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createNewGame} from "../../api/request/sportRequest";
import {useNavigate} from "react-router-dom";

const ModalNewPadelGame = ({ showModal, handleCloseModal, id, userData}) => {
    const navigate = useNavigate();
    const [gameType, setGameType] = useState('individual'); // Estado para almacenar el tipo de juego seleccionado
    const [padelMode, setPadelMode] = useState('normal'); // Estado para almacenar el tipo de juego seleccionado
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
            formData.append('individual', true);
        }

        formData.append('mode', padelMode);

        if(player1 !== null || player2 !== null){
            await createNewGame(formData, 'padel').then((response) => {
                if (response.status == 200){
                    navigate('/sports/'+id+'/game/'+response.data.id);
                }
            })
        }else{
            alert('Por favor completar los nombres');
        }

    }

    const handleGameTypeChange = (event) => {
        setGameType(event.target.value);
    }


    const handlePadelModeChange = (event) => {
        setPadelMode(event.target.value);
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

                        <Form.Label>Modalidad</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="NORMAL"
                                value="normal"
                                checked={padelMode === 'normal'}
                                onChange={handlePadelModeChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="ORO"
                                value="oro"
                                checked={padelMode === 'oro'}
                                onChange={handlePadelModeChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="TBR"
                                value="tbr"
                                checked={padelMode === 'tbr'}
                                onChange={handlePadelModeChange}
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

export default ModalNewPadelGame;
