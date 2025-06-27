import { useState } from "react";
import type { Reminder } from "../../types/reminder";
import { getPriorityConfig, type Priority } from "../../utils/priorityUtils";
import styles from "./ReminderItem.module.css";
import { Check, Edit, X } from "lucide-react";

interface ReminderItemProps {
    reminder: Reminder;
    onToggle: (id: string) => void;
    onEdit: (id: string, newText: string, priority: Priority) => void;
    onDelete: (id: string) => void;
}

export const ReminderItem = ({ reminder, onToggle, onEdit, onDelete }: ReminderItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(reminder.text);
    const [editPriority, setEditPriority] = useState<Priority>(reminder.priority);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const config = getPriorityConfig(reminder.priority);

    return (
        <div>
            {isEditing ? (
                <div>
                    <form>
                        <input type="text" value={editText} />
                    </form>

                    <div>
                        
                        <div>
                            <button type="button" >Cancelar</button>
                            <button type="button" >Salvar</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <button>{reminder.completed && <Check size={12} />}</button>

                    <div>
                        <div>
                            <div>
                                <span title={reminder.text}>{reminder.text}</span>
                            </div>
                        </div>

                        <div>
                            <button><Edit size={12}/></button>
                            <button><X size={12} /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}