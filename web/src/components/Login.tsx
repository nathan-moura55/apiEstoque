import React, { useState } from 'react';
import { Header } from './Header';


interface LoginProps {
  onEntrar: () => void;
}

export const Login = ({ onEntrar }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const containerStyle: React.CSSProperties = {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, sans-serif'
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '380px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    border: '1px solid #e0e0e0',
    padding: '15px 25px',
    borderRadius: '50px',
    outline: 'none',
    width: '100%',
    marginBottom: '15px',
    fontSize: '1rem'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#000',
    color: '#fff',
    width: '100%',
    padding: '15px',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '10px',
    letterSpacing: '1px'
  };

  return (
    <div>
    <Header />
    <div style={containerStyle}>
      
      <div style={cardStyle}>
        <h1 style={{ textTransform: 'uppercase', letterSpacing: '6px', marginBottom: '40px', fontWeight: '800' }}>
          FLUXO
        </h1>
        
        <form onSubmit={(e) => { e.preventDefault(); onEntrar(); }}>
          <input 
            type="email" 
            placeholder="E-MAIL" 
            style={inputStyle} 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="SENHA" 
            style={inputStyle} 
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          
          <button type="submit" style={buttonStyle}>
            ENTRAR NO SISTEMA
          </button>
        </form>
        <p style={{ marginTop: '25px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
          Não possui conta?
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
          Gerenciamento de Estoque v1.0
        </p>
      </div>
    </div>
    </div>
  );
};