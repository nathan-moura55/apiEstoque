export interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  preco: number; // Caso o seu modelo no C# tenha Preco
  estoqueMinimo?: number; 
}