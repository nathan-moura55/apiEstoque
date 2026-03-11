using Microsoft.AspNetCore.Mvc;
using Estoque.Dominio.Models;
using Estoque.Dominio.Interfaces;

namespace Estoque.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly IControleDeEstoque _controleEstoque;

    public ProdutoController(IControleDeEstoque estoqueService)
    {
        _controleEstoque = estoqueService;
    }

    [HttpGet("todos")]
    public IActionResult Get() => Ok(_controleEstoque.ListarTodos());

    [HttpPost("adicionar")]
    public IActionResult Post(string nome, int quantidade, int estoqueMinimo)
    {
        try
        {
            _controleEstoque.AdicionarProduto(nome, quantidade, estoqueMinimo);
            return Ok(new { mensagem = "Produto cadastrado com sucesso!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet("{id}/buscar")]
    public IActionResult Buscar(int id)
    {
        var produto = _controleEstoque.BuscarProduto(id);
        if (produto == null) return NotFound(new { Mensagem = "Produto não encontrado" });
        return Ok(produto);
    }

    [HttpPost("{id}/editar")]
    public IActionResult Editar(int id, string nome, int quantidade, int estoqueMinimo)
    {
        try
        {
            _controleEstoque.AtualizarProduto(id, nome, estoqueMinimo);
            return Ok(new { mensagem = "Produto atualizado com sucesso!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpPost("{id}/Retirar")]
    public IActionResult SaidaEstoque(int id, [FromQuery] int quantidade) 
    {
        try
        {
            _controleEstoque.RegistrarSaidaEstoque(id, quantidade);
            return Ok(new { mensagem = "Saída registrada com sucesso." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpDelete("{id}/deletar")]
    public IActionResult Deletar(int id)
    {
        _controleEstoque.RemoverProduto(id);
        return Ok();
    }
}