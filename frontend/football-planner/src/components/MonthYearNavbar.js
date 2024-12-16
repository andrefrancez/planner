import React, { useState } from 'react'
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap'

const MonthYearNavbar = ({ currentMonth, currentYear}) => {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const [showModal, setShowModal] = useState(false)
    const [ask, setAsk] = useState('')

    const handleShow = () => setShowModal(true)

    const handleClose = () => setShowModal(false)

    const handleQuestionChange = (event) => setAsk(event.target.value)

    const handleSubmit = () => {
        console.log('Pergunta enviada!', ask)
        setAsk('')
        handleClose()
    }

    return (
        <Navbar bg='secondary' variant='light' className="d-flex justify-content-between align-items-center">
            <Navbar.Brand className="mx-auto text-center">
                {months[currentMonth - 1]} {currentYear}
            </Navbar.Brand>
            <Nav>
                <Button onClick={handleShow} className="me-3 mb-1">
                    ChatGPT
                </Button>
            </Nav>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Digite sua duvida...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='ask'>
                            <Form.Label>Digite sua duvida</Form.Label>
                            <Form.Control as='textarea' rows={3} value={ask} onChange={handleQuestionChange}
                                placeholder='digite...' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleClose}>Fechar</Button>
                    <Button variant='primary' onClick={handleSubmit}>Enviar</Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

export default MonthYearNavbar