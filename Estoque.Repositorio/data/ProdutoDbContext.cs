using Microsoft.EntityFrameworkCore;
using Estoque.Dominio.Models;

namespace Estoque.Repositorio.Data;

public class EstoqueDbContext : DbContext
{
    public EstoqueDbContext(DbContextOptions<EstoqueDbContext> options) : base(options) { }

    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<LogEstoque> Logsestoque {get; set;}
}
