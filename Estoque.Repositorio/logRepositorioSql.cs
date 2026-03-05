using Estoque.Dominio.Models;
using Estoque.Dominio.Interfaces;
using Estoque.Repositorio.Data;
using System.Collections.Generic;
using System.Linq;

namespace Estoque.Repositorio; // O public não pode vir antes daqui

public class LogRepositorioSql : ILogRepositorio
{
    private readonly EstoqueDbContext _context;

    public LogRepositorioSql(EstoqueDbContext context)
    {
        _context = context;
    }

    public void SalvarLog(LogEstoque log)
    {
        _context.Logsestoque.Add(log); // Verifique se no Contexto está Logsestoque ou LogsEstoque
        _context.SaveChanges();
    }

    public IEnumerable<LogEstoque> ListarTodos()
    {
        return _context.Logsestoque.ToList();
    }
}