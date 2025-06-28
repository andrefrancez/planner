import { useState } from "react";
import type { Priority } from "../../utils/priorityUtils";
import styles from "./AddReminderForm.module.css";
import { Plus } from "lucide-react";

interface AddReminderFormProps {
    onAdd: (text: string, priority: Priority) => void;
}

export const AddReminderForm = ({ onAdd }: AddReminderFormProps) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('LOW');
    const [isEspanded, setIsExpanded] = useState(false);
    const [isPrirityOpen, setIsPriorityOpen] = useState(false);

    const resetForm = () => {
        setText("");
        setPriority("LOW");
        setIsExpanded(false);
        setIsPriorityOpen(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim) {
            onAdd(text.trim(), priority);
            resetForm();
        }
    };

    const handleBlur = (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node) && !text.trim()) {
            resetForm();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            resetForm();
        }
    }

    return (
        <div className={styles.container}>
            {!isEspanded ? (
                <button onClick={() => setIsExpanded(true)} className={styles.addButton}>
                    <Plus size={16} />
                    <span>Adicionar</span>
                </button>
            ) : (
                <div onBlur={handleBlur}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown} placeholder="Digite.." className={styles.input} autoFocus
                            />
                        <div className={styles.controls}>


                            <div className={styles.buttons}>
                                <button type="button" onClick={resetForm} className={styles.cancelButton}>Cancelar</button>

                                <button type="submit" disabled={!text.trim()} className={styles.submitButton}>Salvar</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}