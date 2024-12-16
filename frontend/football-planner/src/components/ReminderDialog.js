import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const ReminderDialog = ({ day, hour, reminder, onAddReminder, children }) => {
  const [title, setTitle] = useState(reminder?.title || "")
  const [priority, setPriority] = useState(reminder?.priority || "")
  const [show, setShow] = useState(false);
  const [observation, setObservation] = useState(reminder?.observation || "")

  const saveReminder = () => {
    onAddReminder(day, hour, title, priority)
    setTitle('')
    setPriority('')
    setShow(false)
    setObservation('')
  }

  return (
    <>
      <div onClick={() => setShow(true)}>{children}</div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Lembrete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Digite o título e escolha a prioridade.</p>
          <Form>
            <Form.Group className='mb-3' controlId='reminderTitle'>
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder='Insira o título do lembrete'
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='reminderPriority'>
              <Form.Label>Prioridade:</Form.Label>
              <Form.Control
                as='select' value={priority} onChange={(e) => setPriority(e.target.value)}
              >
                <option value=''>Selecione</option>
                <option value='alta'>Alta</option>
                <option value='media'>Média</option>
                <option value='baixa'>Baixa</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='observationReminder'>
              <Form.Label>Observação</Form.Label>
              <Form.Control
                as='textarea' rows={3} value={observation} onChange={(o) => setObservation(o.target.value)}
                placeholder='Opcional'
              >
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveReminder}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReminderDialog;