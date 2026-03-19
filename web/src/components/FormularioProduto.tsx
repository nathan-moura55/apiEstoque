import React, { useState } from 'react';
import type { Produto } from '../assets/types/produto';

interface FormProps {
  form: Partial<Produto>;
  setForm: (form: Partial<Produto>) => void;
  onSalvar: (e: React.FormEvent) => void;
}

export const FormularioProduto = ({ form, setForm, onSalvar }: FormProps) => {
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
          transition: 'transform 0.3s ease'}
        }      >
        <h2 style={{ textTransform: 'uppercase', fontWeight: '600', fontSize: '1.2rem' }}>
          {estaAberto ? '−' : '+'} {form.id ? 'Editando Produto' : 'Novo Cadastro'}
        </h2>
      </div>

      {estaAberto && (
        <div className="animacao-suave">
        <div style={{ padding: '20px 0px 15px 20px', marginTop: '10px' }}>
          <h3 style={{fontSize: '1em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px',letterSpacing: '2px' }}>
            {form.id ? `Editando: #${form.id} - ${form.nome}` : 'Informações do Produto'}
          </h3>
          
          <form 
            onSubmit={onSalvar} 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              gap: '15px',
            }}
          >
            <input 
              style={inputStyle}
              placeholder="NOME DO PRODUTO" 
              value={form.nome || ''} 
              onChange={e => setForm({...form, nome: e.target.value})} 
              required 
            />
            <input 
              style={inputStyle}
              type="number" 
              placeholder="QUANTIDADE" 
              value={form.quantidade || ''} 
              onChange={e => setForm({...form, quantidade: Number(e.target.value)})} 
              required 
            />
            <input 
              style={inputStyle}
              type="number" 
              placeholder="ESTOQUE MÍNIMO" 
              value={form.estoqueMinimo || ''} 
              onChange={e => setForm({...form, estoqueMinimo: Number(e.target.value)})} 
              required 
            />
            <button 
              type="submit" 
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                padding: '12px 30px', 
                border: 'none', 
                borderRadius: '50px', 
                cursor: 'pointer', 
                fontWeight: '500',
                boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              SALVAR
            </button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};