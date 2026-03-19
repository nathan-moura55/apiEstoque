import { useEffect, useState } from 'react';
import { ProdutoService } from './services/produtoService';
import { Header } from './components/Header';
import { FormularioProduto } from './components/FormularioProduto';
import { TabelaEstoque } from './components/TabelaEstoque';
import { BuscaProduto } from './components/BuscaProduto';
import { PainelOperacoes } from './components/PainelOperacoes';
import { Login } from './components/Login';
import type { Produto } from './assets/types/produto';

function App() {
  const [logado, setLogado] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const [buscaId, setBuscaId] = useState('');
  const [form, setForm] = useState<Partial<Produto>>({ nome: '', quantidade: 0, estoqueMinimo: 0 });

  const [idParaRetirar, setIdParaRetirar] = useState('');
  const [qtdParaRetirar, setQtdParaRetirar] = useState('');
  const [idParaAdicionar, setIdParaAdicionar] = useState('');
  const [qtdParaAdicionar, setQtdParaAdicionar] = useState('');

  const carregarProdutos = async () => {
    setCarregando(true);
    try {
      const response = await ProdutoService.listar();
      setProdutos(response.data);
    } catch {
      setErro("Falha na conexão com a API.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (logado) carregarProdutos();
  }, [logado]);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ProdutoService.salvar(form);

      setForm({ nome: '', quantidade: 0, estoqueMinimo: 0 });

      await carregarProdutos();

      alert("PRODUTO ADICIONADO!");
    } catch (err) {
      alert("Erro ao salvar. Verifique o terminal do VS Code.");
    }
  };

  const confirmarRetirada = async () => {
    try {
      await ProdutoService.retirar(idParaRetirar, qtdParaRetirar);
      setIdParaRetirar('');
      setQtdParaRetirar('');
      carregarProdutos();
    } catch (err: any) {
      alert(err.response?.data?.erro || "Erro ao retirar.");
    }
  };

  const confirmarAdicao = async () => {
    try {
      await ProdutoService.entradaEstoque(idParaAdicionar, qtdParaAdicionar);

      await carregarProdutos();

      setIdParaAdicionar('');
      setQtdParaAdicionar('');
    } catch (err) {
      alert("Erro ao atualizar estoque.");
    }
  };

  if (!logado) {
    return <Login onEntrar={() => setLogado(true)} />;
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000' }}>
      <Header />

      <div style={{ padding: '0 35px 35px 35px' }}>

        <FormularioProduto
          form={form}
          setForm={setForm}
          onSalvar={salvar}
        />

        <BuscaProduto
          buscaId={buscaId}
          setBuscaId={setBuscaId}
          onBuscar={async () => {
            try {
              const res = await ProdutoService.buscar(buscaId);
              setProdutos(res.data ? [res.data] : []);
            } catch (err) {
              alert("Produto não encontrado!");
              setProdutos([]);
            }
          }}
          onLimpar={() => { setBuscaId(''); carregarProdutos(); }}
        />

        <PainelOperacoes
          idParaRetirar={idParaRetirar}
          setIdParaRetirar={setIdParaRetirar}
          qtdParaRetirar={qtdParaRetirar}
          setQtdParaRetirar={setQtdParaRetirar}
          onConfirmarRetirada={confirmarRetirada}
          idParaAdicionar={idParaAdicionar}
          setIdParaAdicionar={setIdParaAdicionar}
          qtdParaAdicionar={qtdParaAdicionar}
          setQtdParaAdicionar={setQtdParaAdicionar}
          onConfirmarAdicao={confirmarAdicao}
        />

        {erro && <div style={{ color: 'red', marginTop: '10px' }}>{erro}</div>}

        <div style={{ marginTop: '30px' }}>
          {carregando ? <p>PROCESSANDO...</p> : (
            <TabelaEstoque
              produtos={produtos}
              onEditar={(p) => { setForm(p); window.scrollTo(0, 0); }}
              onExcluir={async (id) => {
                if (window.confirm("EXCLUIR?")) {
                  await ProdutoService.deletar(id);
                  carregarProdutos();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;