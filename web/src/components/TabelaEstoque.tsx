import { Pencil, Trash2 } from 'lucide-react'; 
import type { Produto } from '../assets/types/produto';

interface TabelaProps {
  produtos: Produto[];
  onEditar: (p: Produto) => void;
  onExcluir: (id: number) => void;
}

export const TabelaEstoque = ({ produtos, onEditar, onExcluir }: TabelaProps) => {
  const btnIconStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #000',
    borderRadius: '8px', 
    padding: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #000', textAlign: 'center'  }}>
          <th style={{ padding: '10px' }}>ID</th>
          <th>NOME</th>
          <th>QTD</th>
          <th>MÍNIMO</th>
          <th>STATUS</th>
          <th style={{ textAlign: 'right', paddingRight: '45px' }}>AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map(p => (
          <tr key={p.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center'  }}>
            <td style={{ padding: '15px 10px' }}>{p.id}</td>
            <td style={{ fontWeight: '500' }}>{p.nome}</td>
            <td>{p.quantidade}</td>
            <td>{p.estoqueMinimo ?? 0}</td>
            <td>
              {p.quantidade == 0 ? (
                <span style={{ color: '#FF1C05', fontWeight: 'bold' }}>SEM ESTOQUE</span>
              ) : p.quantidade <= (p.estoqueMinimo ?? 0) ? (
                <span style={{ color: 'orange', fontWeight: 'bold' }}>BAIXO</span>
              ) : (
                <span style={{ color: 'green' }}>OK</span>
              )}
            </td>
            <td style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', padding: '10px 20px' }}>
              <button 
                onClick={() => onEditar(p)} 
                title="Editar Produto"
                style={btnIconStyle}
              >
                <Pencil size={18} color="#000" />
              </button>

              <button 
                onClick={() => p.id && onExcluir(p.id)} 
                title="Excluir Produto"
                style={{ ...btnIconStyle, borderColor: '#FF1C05' }}
              >
                <Trash2 size={18} color="#FF1C05" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};