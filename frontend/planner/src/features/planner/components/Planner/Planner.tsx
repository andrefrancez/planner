import { useCallback, useState } from "react";
import { PlannerNavbar } from "../PlannerNavbar/PlannerNavbar.tsx";
import styles from "./Planner.module.css";

const Planner = () => {
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const navigateWeek = useCallback((direction: 'prev' | 'next') => {
        setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
            return newDate;
        });
    }, []);

    const handleToday = useCallback(() => {
        setCurrentWeek(new Date());
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <PlannerNavbar
                    currentWeek={currentWeek}
                    onPreviousWeek={() => navigateWeek('prev')}
                    onNextWeek={() => navigateWeek('next')}
                    onToday={handleToday}
                />
            </div>

            <div className={styles.grid}>

            </div>

            <div className={styles.footer}>
            </div>
        </div>
    )
}

export default Planner;