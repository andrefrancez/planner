import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { saveReminder, removeReminder} from '../services/ReminderServices.js'

export default class ReminderDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      priority: '',
      show: false,
      reminderId: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.reminder !== prevProps.reminder && this.props.reminder?.id) {
      this.setState({
        reminderId: this.props.reminder?.id,
        title: this.props.reminder?.title,
        priority: this.props.reminder?.priority,
        observation: this.props.reminder?.observation
      });
    }
  }

  handleSave = async () => {
    const { title, priority, reminderId} = this.state
    const { day, hour, days, currentDay } = this.props

    try{
      let result

      if(reminderId){
        result = await saveReminder({title, priority, reminderId})
      } else{
        const dayOfWeek = days.indexOf(day)
        const dayDate = currentDay[dayOfWeek]
        const scheduled_at = `${dayDate.toISOString().split('T')[0]} ${hour.padStart(2, '0')}:00`;

        result = await saveReminder({ title, priority, reminderId, scheduled_at})
      }

      if(result.success){
        alert('Lembrete salvo!')
        this.handleClose()

        window.location.reload()
      }else{
        alert('Erro ao salvar: ', result.error)
      }
    }catch(error){
      console.error('(dialog) Erro ao salvar! ', error)
    }
  }

  handleDelete = async () => {
    const {reminder} = this.props

    try{
      const result = await removeReminder(reminder.id)
      if(result.success){
        alert('Lembrete exluído!')
        this.handleClose()
        window.location.reload()
      }else{
        alert('Erro ao excluir!', result.error)
      }
    }catch(error){
      console.error('(dialog) erro ao excluir:', error)
    }
  }

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });
  handleChange = (field) => (event) => this.setState({ [field]: event.target.value });

  render() {
    const { title, priority, show, reminderId} = this.state;
    const { children } = this.props;

    return (
      <>
        <div onClick={this.handleShow}>{children}</div>
        <Modal show={show} onHide={this.handleClose} centered>
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
                  onChange={this.handleChange('title')}
                  placeholder="Digite..."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="reminderPriority">
                <Form.Label>Prioridade:</Form.Label>
                <Form.Control
                  as="select"
                  value={priority}
                  onChange={this.handleChange('priority')}
                >
                  <option value="">Selecione</option>
                  <option value="alta">Alta</option>
                  <option value="media">Média</option>
                  <option value="baixa">Baixa</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="observation">
                <Form.Label>Observação:</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={''}
                  onChange={this.handleChange('observation')}
                  placeholder="Digite..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Cancelar
            </Button>
            {reminderId && (
              <Button variant="danger" onClick={this.handleDelete}>
                Excluir
              </Button>
            )}
            <Button variant="primary" onClick={this.handleSave}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}