import React, { Component } from 'react'
import {Navbar, Nav, Modal, Button, Form} from 'react-bootstrap'
import {createAsk} from '../api/Axios.js'

class MonthYearNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            ask: '',
            response: '',
            loading: false
        }
    }

    handleShow = () => {
        this.setState({showModal: true})
    }

    handleClose = () => {
        this.setState({showModal: false})
    }

    handleQuestionChange = (event) => {
        this.setState({ask: event.target.value})
    }

    handleSubmit = async () => {
        const {ask} = this.state
        if (ask.trim()) {
            this.setState({loading: true})

            try {
                const responseData = await createAsk(ask)
                this.setState({response: responseData})
            } catch (error) {
                console.error('Erro ao enviar pergunta!', error)
            } finally {
                this.setState({loading: false})
            }
        }

        this.handleClose()
    }

    render() {
        const {currentMonth, currentYear, onLastWeek, onNextWeek} = this.props
        const {showModal, ask, response, loading} = this.state

        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]

        return (
            <Navbar bg='secondary' variant='light' className="d-flex justify-content-between align-items-center">
                <Nav>
                    <Button variant="outline-dark" className='m-1' onClick={onLastWeek}>{"< Semana anterior"}</Button>
                </Nav>
                <Navbar.Brand className="mx-auto text-center fw-bold">
                    {months[currentMonth - 1]} / {currentYear}
                </Navbar.Brand>
                <Nav>
                    <Button onClick={this.handleShow} className="m-1">
                        ChatGPT
                    </Button>
                    <Button variant="outline-dark" className='m-1' onClick={onNextWeek}>{"Proxima semana >"}</Button>
                </Nav>
                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Peça uma susgestão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='ask'>
                                <Form.Control as='textarea' rows={3} value={ask} onChange={this.handleQuestionChange}
                                    placeholder='digite...' />
                            </Form.Group>
                            {loading && <p>Carregando resposta...</p>}
                            {response && <p><strong>Resposta:</strong> {response}</p>}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.handleClose}>Fechar</Button>
                        <Button variant='primary' onClick={this.handleSubmit}>Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </Navbar>
        )
    }
}

export default MonthYearNavbar
