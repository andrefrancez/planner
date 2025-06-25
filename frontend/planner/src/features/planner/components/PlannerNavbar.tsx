import { useState } from "react";
import { useNavigate } from "react-router-dom"
import SearchModal from "./SearchModal";

const PlannerNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #4234c7' }}>
            <div>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
            <div>
                <button onClick={() => setIsOpen(true)}>ChatGPT</button>
            </div>
            {isOpen && <SearchModal onClose={() => setIsOpen(false)} />}
        </nav>
    )
}

export default PlannerNavbar;