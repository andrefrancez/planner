import { useState } from "react";

interface SearchModalProps{
    onClose: () => void;
}

const SearchModal = ({ onClose }: SearchModalProps)=> {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const handleSearch = async () =>{
        try{
            const res = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResult(JSON.stringify(data));
        }catch{
            setResult('Erro ao pesquisar!');
        }
    };

    return(
        <div style={{position: 'fixed', top: '20%', left: '25%', width: '50%', padding: '2rem', background: '#4234c7', border: '1px solidrgb(43, 34, 128)'}}>
            <h2>Pesquisar</h2>
            <input placeholder="Digite sua pesquisa" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={onClose}>Fechar</button>
            {result && (
                <div>
                    <strong>Resposta: </strong>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    )
}

export default SearchModal;