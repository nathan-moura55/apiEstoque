using Estoque.Dominio.Models;
using Estoque.Dominio.Interfaces;
using Estoque.Repositorio.Data;

namespace Estoque.Repositorio
{
    public class UsuarioRepositorioSql : IUsuarioRepositorio
    {
        private readonly EstoqueDbContext _context;

        public UsuarioRepositorioSql(EstoqueDbContext context)
        {
            _context = context;
        }

        public Usuario ObterPorId(int id) => _context.Usuarios.Find(id);

        public IEnumerable<Usuario> ObterTodos() => _context.Usuarios.ToList();

        public void Adicionar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
        }
    }
}