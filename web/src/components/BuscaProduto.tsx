import React, { useState } from 'react';

interface BuscaProps {
  buscaId: string;
  setBuscaId: (id: string) => void;
  onBuscar: () => void;
  onLimpar: () => void;
}

export const BuscaProduto = ({ buscaId, setBuscaId, onBuscar, onLimpar }: BuscaProps) => {
  const [estaAberto, setEstaAberto] = useState(false);

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    border: '1px solid #e0e0e0',
    padding: '12px 20px',
    borderRadius: '50px',
    outline: 'none',
    width: '25%',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <div 
        onClick={() => setEstaAberto(!estaAberto)} 
        style={{ cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          paddingLeft: '5px', 
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease'   }}
      >
        <h2 style={{textTransform: 'uppercase', fontWeight: '600', fontSize: '1.2rem' }}>
          {estaAberto ? '−' : '+'} CONSULTAR ESTOQUE
        </h2>
      </div>

      {estaAberto && (
        <div className="animacao-suave">
        <div style={{ marginTop: '20px', padding: '20px 0px 15px 20px' }}>
          <h3 style={{fontSize: '1em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px', letterSpacing: '2px' }}>
            Buscar Produto
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              style={inputStyle} 
              placeholder="BUSCAR POR ID" 
              value={buscaId} 
              onChange={e => setBuscaId(e.target.value)} 
            />
            <button 
              onClick={onBuscar} 
              style={{ backgroundColor: '#000', color: '#fff', padding: '12px 30px', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '500',boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)' }}
            >
              BUSCAR
            </button>
            <button 
              onClick={onLimpar} 
              style={{ 
                backgroundColor: '#fff', 
                color: '#000', 
                padding: '12px 30px', 
                border: '1px solid #000', 
                borderRadius: '50px', 
                cursor: 'pointer', 
                fontWeight: '500', 
                boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)' }}
            >
              LIMPAR
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};