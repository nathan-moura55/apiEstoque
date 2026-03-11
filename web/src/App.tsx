import { useEffect, useState } from 'react';
import api from './services/api';
import { type Produto } from './assets/types/produto';

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [buscaId, setBuscaId] = useState('');
  const [idParaRetirar, setIdParaRetirar] = useState('');
  const [qtdParaRetirar, setQtdParaRetirar] = useState('');
  const [form, setForm] = useState<Partial<Produto>>({ nome: '', quantidade: 0, estoqueMinimo: 0 });

 const carregarProdutos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const response = await api.get<Produto[]>(`/produto/todos?t=${new Date().getTime()}`);
      setProdutos(response.data);
    } catch (err: any) {
      setErro("Falha na conexão com o sistema.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarPorId = async () => {
    if (!buscaId) return await carregarProdutos();
    setCarregando(true);
    setErro(null);
    try {
      const response = await api.get<Produto>(`/produto/${buscaId}/buscar`);
      setProdutos(response.data ? [response.data] : []);
    } catch (err) {
      setErro("Produto não encontrado.");
    } finally {
      setCarregando(false);
    }
  };

  const salvarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = form.id 
        ? `/produto/${form.id}/editar?nome=${form.nome}&quantidade=${form.quantidade}&estoqueMinimo=${form.estoqueMinimo}`
        : `/produto/adicionar?nome=${form.nome}&quantidade=${form.quantidade}&estoqueMinimo=${form.estoqueMinimo}`;

      await api.post(endpoint);

      setForm({ nome: '', quantidade: 0, estoqueMinimo: 0 });
      
      await carregarProdutos();
      
      alert(form.id ? "PRODUTO ATUALIZADO!" : "PRODUTO CADASTRADO!");
    } catch (err) {
      setErro("Erro ao salvar produto.");
    }
  };

  const handleRetirada = async () => {
    if (!idParaRetirar || !qtdParaRetirar) {
      alert("INFORME O ID E A QUANTIDADE");
      return;
    }

    try {
      await api.post(`/produto/${idParaRetirar}/retirar?quantidade=${qtdParaRetirar}`);
      
      setIdParaRetirar('');
      setQtdParaRetirar('');
      
      await carregarProdutos();
      
      alert("ESTOQUE ATUALIZADO");
    } catch (err: any) {
      alert(err.response?.data?.erro || "Erro ao retirar.");
    }
  };

  const deletarProduto = async (id: number) => {
    if (!window.confirm("CONFIRMAR EXCLUSÃO?")) return;
    try {
      await api.delete(`/produto/${id}/deletar`);
      
      await carregarProdutos();
    } catch (err: any) {
      alert(err.response?.data?.erro || "Erro ao deletar produto.");
    }
  };

  const prepararEdicao = (p: Produto) => {
    setForm(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { carregarProdutos(); }, []);

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5', 
    border: '1px solid #e0e0e0',
    color: '#000', 
    padding: '12px 20px',
    fontSize: '15px',
    fontFamily: 'sans-serif', 
    fontWeight: 'normal',
    borderRadius: '50px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)', 
    outline: 'none',
    width: '25%', 
    transition: 'all 0.3s ease', 
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#fff', overflowX: 'hidden', color: '#000' }}>
      <div style={{ width: '100%', padding: '35px', boxSizing: 'border-box' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          <h1 style={{ margin: 0, textTransform: 'uppercase', fontWeight: 'normal', fontSize: '2rem', letterSpacing: '2px' }}>
            Fluxo
          </h1>
        </div>

        <div style={{ width: 'auto', marginBottom: '30px', border: '2px solid #000', padding: '15px' }}>
          
          <h3 style={{ marginTop: 0, textTransform: 'uppercase', fontWeight: '500' }}>
            {form.id ? 'Editar Produto' : 'Novo Produto'}
          </h3>
          <form onSubmit={salvarProduto} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <input style={inputStyle} placeholder="NOME" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
            <input 
              style={inputStyle} 
              type="number" 
              placeholder="QUANTIDADE"
              value={form.quantidade || ''} 
              onChange={e => setForm({ ...form, quantidade: Number(e.target.value) })} 
              required 
            />
            <input 
              style={inputStyle} 
              type="number" 
              placeholder="ESTOQUE MÍNIMO" 
              value={form.estoqueMinimo || ''} 
              onChange={e => setForm({ ...form, estoqueMinimo: Number(e.target.value) })} 
              required 
            />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '450', cursor: 'pointer' }}>
              {form.id ? 'ATUALIZAR' : 'CADASTRAR'}
            </button>
            {form.id && (
              <button type="button" onClick={() => setForm({ nome: '', quantidade: 0, estoqueMinimo: 0 })} style={{ background: 'none', border: '2px solid #000', fontWeight: '450', color: '#940000d5', cursor: 'pointer' }}>
                CANCELAR
              </button>
            )}
          </form>

          <div style={{ borderTop: '2px solid #000', marginTop: '30px', paddingTop: '20px' }}>
            <h3 style={{ marginTop: 0, textTransform: 'uppercase', fontWeight: '500' }}>Buscar Produto</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input style={inputStyle} placeholder="BUSCAR POR ID" value={buscaId} onChange={e => setBuscaId(e.target.value)} />
              <button onClick={buscarPorId} style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', fontWeight: '450', cursor: 'pointer' }}>BUSCAR</button>
              <button onClick={() => { setBuscaId(''); carregarProdutos(); }} style={{ background: 'none', border: '2px solid #000', fontWeight: '450', color: '#292121', cursor: 'pointer' }}>LIMPAR</button>
            </div>
          </div>

          <div style={{ borderTop: '2px solid #000', marginTop: '30px', paddingTop: '20px' }}>
            <h3 style={{ marginTop: 0, textTransform: 'uppercase', fontWeight: '500' }}> Retirar Produto </h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <input style={inputStyle} placeholder="ID DO PRODUTO" value={idParaRetirar} onChange={e => setIdParaRetirar(e.target.value)} />
              <input style={inputStyle} type="number" placeholder="QTD PARA SAÍDA" value={qtdParaRetirar} onChange={e => setQtdParaRetirar(e.target.value)} />
              <button onClick={handleRetirada} style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', fontWeight: '450', cursor: 'pointer' }}>
                CONFIRMAR RETIRADA
              </button>
            </div>
          </div>
        </div>

        {carregando && <p>PROCESSANDO...</p>}
        {erro && <div style={{ padding: '15px', border: '2px solid #000', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', marginBottom: '20px' }}>⚠️ {erro}</div>}

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000' }}>
          <thead>
            <tr style={{ backgroundColor: '#000', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px', fontWeight: '400' }}>ID</th>
              <th style={{ padding: '12px', fontWeight: '400' }}>PRODUTO</th>
              <th style={{ padding: '12px', fontWeight: '400' }}>QTD.</th>
              <th style={{ padding: '12px', fontWeight: '400' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} style={{ borderBottom: '2px solid #000' }}>
                <td style={{ padding: '12px', fontWeight: '450' }}>{p.id}</td>
                <td style={{ padding: '12px', fontWeight: '450' }}>{p.nome?.toUpperCase()}</td>
                <td style={{ padding: '12px', fontWeight: '450' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    backgroundColor: p.quantidade <= (p.estoqueMinimo || 0) ? '#000' : '#fff', 
                    color: p.quantidade <= (p.estoqueMinimo || 0) ? '#fff' : '#000', 
                    border: '1px solid #000', 
                    fontWeight: '450' 
                  }}>
                    {p.quantidade} UN.
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => prepararEdicao(p)} style={{ border: '1px solid #000', background: 'none', marginRight: '5px', cursor: 'pointer', fontWeight: '450', color: '#000' }}>EDITAR</button>
                  <button onClick={() => deletarProduto(p.id!)} style={{ backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '450'}}>EXCLUIR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;