using Microsoft.AspNetCore.Mvc;
using Estoque.Repositorio;
using Estoque.Dominio.Models;
using Estoque.Servicos;
using Estoque.Dominio.Interfaces;

namespace Estoque.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly IProdutoRepositorio _repositorio;

    public ProdutoController(IProdutoRepositorio repositorio)
    {
        _repositorio = repositorio;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var produtos = _repositorio.ObterTodos();
        return Ok(produtos);
    }

    [HttpPost]
    public IActionResult Post(Produto produto)
    {
        _repositorio.Adicionar(produto);
        return Ok();
    }
}
