import React, { useState } from 'react';

interface OperacoesProps {
  idParaRetirar: string;
  setIdParaRetirar: (id: string) => void;
  qtdParaRetirar: string;
  setQtdParaRetirar: (qtd: string) => void;
  onConfirmarRetirada: () => void;

  idParaAdicionar: string;
  setIdParaAdicionar: (id: string) => void;
  qtdParaAdicionar: string;
  setQtdParaAdicionar: (qtd: string) => void;
  onConfirmarAdicao: () => void;
}

export const PainelOperacoes = ({
  idParaRetirar, setIdParaRetirar, qtdParaRetirar, setQtdParaRetirar, onConfirmarRetirada,
  idParaAdicionar, setIdParaAdicionar, qtdParaAdicionar, setQtdParaAdicionar, onConfirmarAdicao
}: OperacoesProps) => {

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

  const sectionStyle: React.CSSProperties = {
    marginTop: '5px',
    padding: '10px 0px 15px 20px'
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <div
        onClick={() => setEstaAberto(!estaAberto)}
        style={{
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          paddingLeft: '5px', 
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease'
        }}
      >
        <h2 style={{ textTransform: 'uppercase', fontWeight: '600', fontSize: '1.2rem'  }}>
          {estaAberto ? '−' : '+'} MOVIMENTAÇÃO DE ESTOQUE
        </h2>
      </div>

      {estaAberto && (
        <div className='animacao-suave'>
          <div>
            <div style={sectionStyle}>
              <h3 style={{
                fontSize: '1em',
                textTransform: 'uppercase',
                fontWeight: '500',
                marginBottom: '20px',
                letterSpacing: '2px'
              }}>
                Adicionar Estoque ↑
              </h3>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  style={inputStyle}
                  placeholder="ID DO PRODUTO"
                  value={idParaAdicionar}
                  onChange={e => setIdParaAdicionar(e.target.value)}
                />
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="QTD PARA ENTRADA"
                  value={qtdParaAdicionar}
                  onChange={e => setQtdParaAdicionar(e.target.value)}
                />
                <button
                  onClick={onConfirmarAdicao}
                  style={{ backgroundColor: '#000', color: '#fff', padding: '12px 30px', border: '0,5px solid #000', borderRadius: '50px', cursor: 'pointer', fontWeight: '500', boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)' }}
                >
                  CONFIRMAR ADIÇÃO
                </button>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={{
                fontSize: '1em',
                textTransform: 'uppercase',
                fontWeight: '500',
                marginBottom: '20px',
                letterSpacing: '2px'
              }}>
                Retirar Produto ↓
              </h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  style={inputStyle}
                  placeholder="ID DO PRODUTO"
                  value={idParaRetirar}
                  onChange={e => setIdParaRetirar(e.target.value)}
                />
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="QTD PARA SAÍDA"
                  value={qtdParaRetirar}
                  onChange={e => setQtdParaRetirar(e.target.value)}
                />
                <button
                  onClick={onConfirmarRetirada}
                  style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    padding: '12px 30px',
                    border: '1px solid #000',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
                    filter: 'drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.3))',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  CONFIRMAR RETIRADA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};