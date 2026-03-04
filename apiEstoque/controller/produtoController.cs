using Microsoft.AspNetCore.Mvc;
using Estoque.Dominio.Models;
using Estoque.Servicos;
using Estoque.Dominio.Interfaces;

namespace Estoque.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly IControleDeEstoque _estoqueService;

    public ProdutoController(IControleDeEstoque estoqueService)
    {
        _estoqueService = estoqueService;
    }

    [HttpGet]
    public IActionResult Get() => Ok(_estoqueService.ListarTodos());


    [HttpPost("adicionar")]
    public IActionResult Post(string nome, int quantidade, int estoqueMinimo)
    {
        try
        {
            var novoProduto = new Produto(0, nome, quantidade, estoqueMinimo);

            _estoqueService.AdicionarProduto(novoProduto);

            return Ok(novoProduto);
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet("{id}/buscar")]
    public IActionResult Buscar(int id)
    {
        try
        {
            var produto = _estoqueService.BuscarProduto(id);

            if (produto == null)
                return NotFound(new { Mensagem = "produto não encontrado no sistema" });
            return Ok(produto);
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }

    }
    [HttpPatch("{id}/entrada")]
    public IActionResult Entrada(int id, [FromBody] int qtd)
    {
        _estoqueService.EntradaEstoque(id, qtd);
        return Ok();
    }

    [HttpPatch("{id}/saida")]
    public IActionResult saida(int id, [FromBody] int qtd)
    {
        _estoqueService.SaidaEstoque(id, qtd);
        return Ok();
    }

    [HttpDelete("{id}/deletar")]
    public IActionResult deletar(int id)
    {
        _estoqueService.RemoverProduto(id);
        return Ok();
    }
}