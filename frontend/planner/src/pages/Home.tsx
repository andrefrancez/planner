import {useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Bem-vindo ao Planner</h1>
            <p>Gerencia suas tarefas semanais</p>
            <button onClick={() => navigate('/planner')}>Ir ao Planner</button>
        </div>
    )
}

export default Home;