using Estoque.Dominio.Models;
using System.Collections.Generic;

namespace Estoque.Dominio.Interfaces
{
    public interface IControleDeEstoque
    {
        
        IEnumerable<Produto> ListarTodos();
        Produto BuscarProduto(int id);

        void AdicionarProduto(string nome, int quantidade, int estoqueMinimo);
        void AtualizarProduto(int id, string? novoNome, int? novoMinimo);
        void EntradaEstoque(int id, int quantidade);
        void RegistrarSaidaEstoque(int id, int quantidade);
        void RemoverProduto(int id);
    }
}