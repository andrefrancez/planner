import { useState } from "react";
import type { Priority, Reminder } from "../types/reminder";
import { v4 as uuidv4 } from 'uuid';

interface ReminderFormProps {
    date: string;
    onAdd: (reminder: Reminder) => void;
}

const ReminderForm = ({ date, onAdd }: ReminderFormProps) => {
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState('');
    const [notes, setNotes] = useState('');
    const [priority, setPriority] = useState<Priority>('baixa');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        const newReminder: Reminder = {
            id: uuidv4(),
            title,
            hour: hour || undefined,
            notes: notes || undefined,
            priority,
            day: date,
        };

        onAdd(newReminder);
        setTitle('');
        setHour('');
        setNotes('');
        setPriority('baixa');
        setIsOpen(false);
    };

    return (
        <div>
            <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={openModal} />

            {isOpen && (
                <form onSubmit={handleSubmit}>

                    <input type="time" value={hour} onChange={(e) => setHour(e.target.value)} />

                    <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                    </select>

                    <textarea placeholder="Observações..." value={notes} onChange={(e) => setNotes(e.target.value)} />

                    <button type="submit" onClick={closeModal}>Adicionar</button>
                    <button type="button" onClick={closeModal}>Cancelar</button>
                </form>
            )}
        </div>
    )
}

export default ReminderForm;