import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { formatWeekRange } from "../../utils/dateUtils";
import styles from "./PlannerNavbar.module.css";
import { useNavigate } from "react-router-dom";

interface PlannerNavbarProps {
    currentWeek: Date;
    onPreviousWeek: () => void;
    onNextWeek: () => void;
    onToday: () => void;
}

export const PlannerNavbar = ({currentWeek, onPreviousWeek, onNextWeek, onToday }: PlannerNavbarProps) => {
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <h1>Planner Semanal</h1>
                <p>{formatWeekRange(currentWeek)}</p>
            </div>

            <div className={styles.controls}>
                <button onClick={() => navigate('/')} className={styles.button}>
                    Home
                </button>
                <button onClick={onToday} className={styles.button}>
                    <RotateCcw size={16} />
                </button>

                <button onClick={onPreviousWeek} className={styles.button}>
                    <ChevronLeft size={16} />
                </button>

                <button onClick={onNextWeek} className={styles.button}>
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}