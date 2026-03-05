using Estoque.Dominio.Models;

namespace Estoque.Dominio.Interfaces
{
    public interface IUsuarioRepositorio
    {
        Usuario ObterPorId(int id);
        IEnumerable<Usuario> ObterTodos();
        void Adicionar(Usuario usuario); 
    }
}