using Estoque.Dominio.Models;
using System.Collections.Generic;

namespace Estoque.Dominio.Interfaces;

public interface ILogRepositorio
{
    void SalvarLog(LogEstoque log); 
    IEnumerable<LogEstoque> ListarTodos();
}