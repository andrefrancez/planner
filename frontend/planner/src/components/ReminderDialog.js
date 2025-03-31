import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { saveReminder, removeReminder } from '../services/ReminderServices.js'

const ReminderDialog = ({ children, day, hour, days, currentDay, reminder }) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  const [show, setShow] = useState(null)
  const [reminderId, setReminderId] = useState(null)
  const [observation, setObservation] = useState('')

  useEffect(() => {
    if (reminder?.id) {
      setReminderId(reminder.id)
      setTitle(reminder.title)
      setPriority(reminder.priority)
      setPriority(reminder.observation)
    }
  }, [reminder])

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleSave = async () => {
    try {
      let result
      if (reminderId) {
        result = await saveReminder({ title, priority, reminderId })
      } else {
        const dayOfWeek = days.indexOf(day)
        const dayDate = currentDay[dayOfWeek]
        const scheduled_at = `${dayDate.toISOString().split('T')[0]} ${hour.padStart(2, '0')}:00`
        result = await saveReminder({ title, priority, scheduled_at })
      }

      if (result.success) {
        alert('Lembrete Salvo!')
        handleClose()
        window.location.reload()
      } else {
        alert('Erro ao salvar! -> ', result.error)
      }
    } catch (error) {
      console.error('Erro ao salvar! ', error)
    }
  }

  const handleDelete = async () => {
    try {
      const result = await removeReminder(reminder.id)
      if (result.success) {
        alert('Lembrete exluído!')
        handleClose()
        window.location.reload()
      } else {
        alert('Erro ao excluir!', result.error)
      }
    } catch (error) {
      console.error('(dialog) erro ao excluir:', error)
    }
  }

  return (
    <>
      <div onClick={handleShow}>{children}</div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-secondary text-white">
          <Modal.Title>{reminderId ? 'Editar Lembrete' : 'Adicionar Lembrete'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Digite o título e escolha a prioridade.</p>
          <Form>
            <Form.Group className="mb-3" controlId="reminderTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reminderPriority">
              <Form.Label>Prioridade:</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="observation">
              <Form.Label>Observação: </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Digite..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          {reminderId && (
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
          )}
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReminderDialog