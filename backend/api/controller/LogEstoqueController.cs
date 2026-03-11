using Microsoft.AspNetCore.Mvc;
using Estoque.Dominio.Interfaces;

[ApiController]
[Route("api/logs")]
public class LogController : ControllerBase
{
    private readonly ILogRepositorio _logRepo;

    public LogController(ILogRepositorio LogRepo)
    {
        _logRepo = LogRepo;
    }
    
    [HttpGet]
    public IActionResult ListarAlteracoes()
    {
        var logs = _logRepo.ListarTodos()
        .OrderByDescending(l=>l.Data);
        return Ok(logs);
    }



}

