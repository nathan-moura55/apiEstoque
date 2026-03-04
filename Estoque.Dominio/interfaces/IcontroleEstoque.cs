namespace Estoque.Dominio.Interfaces;
using Estoque.Dominio.Models;

public interface IControleDeEstoque
{
    void AdicionarProduto(Produto produto);
    Produto BuscarProduto(int id);
    void EntradaEstoque(int id, int quantidade);
    void SaidaEstoque(int id, int quantidade);
    void RemoverProduto(int id);
    IEnumerable<Produto> ListarTodos(); 
}