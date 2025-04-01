import React, { useState } from 'react';
import { createAsk } from '../../api/Axios';
import "../../styles/Modal.css"
import "../../styles/Button.css"

const ChatGPTModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ask, setAsk] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (ask.trim()) {
      setLoading(true);
      try {
        const responseData = await createAsk(ask);
        setResponse(responseData);
      } catch (error) {
        console.error('Erro ao enviar a pergunta!', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <button className="trigger"
        onClick={() => setIsOpen(true)}
      >
        ChatGPT
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="a-modal-content">
            <h2 className="modal-title">Peça uma sugestão</h2>          
            <div className="input-group">
              <label>Digite sua pergunta:</label>
              <textarea
                rows={3}
                value={ask}
                onChange={(e) => setAsk(e.target.value)}
                placeholder="Digite..."
              />
            </div>
            {loading && <div className="loading-indicator">Carregando resposta...</div>}
            {response && (
              <div className="response-group">
                <label>Resposta:</label>
                <div className="response-content">{response}</div>
              </div>
            )}

            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => {
                  setIsOpen(false);
                  setAsk('');
                  setResponse('');
                }}
              >
                Cancelar
              </button>
              <button 
                className="submit-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatGPTModal;