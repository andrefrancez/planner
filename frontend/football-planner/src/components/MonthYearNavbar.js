import React, { useState } from 'react'
import {Navbar, Nav, Modal, Button, Form} from 'react-bootstrap'
import {createAsk} from '../api/Axios.js'

const MonthYearNavbar = ({currentMonth, currentYear, onLastWeek, onNextWeek}) => {
    const [ask, setAsk] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    
    const handleShow = () => setShowModal(true)

    const handleClose = () => setShowModal(false)

    const handleAskChange = (event) => setAsk(event.target.value)
    
    const handleSubmit = async () => {
        if(ask.trim()){
            setLoading(true)

            try{
                const responseData = await createAsk(ask)
                setResponse(responseData)
            } catch(error){
                console.error('Erro ao enviar a pergunta!', error)
            } finally{
                setLoading(false)
            }
        }

        handleClose()
    }

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    return(
        <Navbar bg="secondary" variant="light" className="d-flex justify-content-between align-items-center">
            <Nav>
                <Button variant="outline-dark" className="m-1" onClick={onLastWeek}>
                    {"< Semana anterior"}
                </Button>
            </Nav>
            <Navbar.Brand className="mx-auto text-center fw-bold">
                {months[currentMonth - 1]} / {currentYear}
            </Navbar.Brand>
            <Nav>
                <Button onClick={handleShow} className="m-1">
                    ChatGPT
                </Button>
                <Button variant="outline-dark" className="m-1" onClick={onNextWeek}>
                    {"Próxima semana >"}
                </Button>
            </Nav>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Peça uma sugestão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="ask">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={ask}
                                onChange={handleAskChange}
                                placeholder="Digite..."
                            />
                        </Form.Group>
                        {loading && <p>Carregando resposta...</p>}
                        {response && (
                            <p>
                                <strong>Resposta:</strong> {response}
                            </p>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

export default MonthYearNavbar