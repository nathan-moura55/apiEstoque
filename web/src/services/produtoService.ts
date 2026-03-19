import api from './api';
import type { Produto } from '../assets/types/produto';

export const ProdutoService = {
  listar: () => api.get<Produto[]>(`/Produto/todos?t=${new Date().getTime()}`),
  
  buscar: (id: string) => api.get<Produto>(`/Produto/${id}/buscar`),
  
  salvar: (form: Partial<Produto>) => {
    const params = `nome=${form.nome}&quantidade=${form.quantidade}&estoqueMinimo=${form.estoqueMinimo}`;
    
    return form.id 
      ? api.post(`/Produto/${form.id}/editar?${params}`) 
      : api.post(`/Produto/adicionar?${params}`);
  },

  entradaEstoque: (id: string, qtd: string) => 
    api.post(`/Produto/${id}/entrada?quantidade=${qtd}`),

  retirar: (id: string, qtd: string) => 
    api.post(`/Produto/${id}/retirar?quantidade=${qtd}`),
  
  deletar: (id: number) => api.delete(`/Produto/${id}/deletar`)
};