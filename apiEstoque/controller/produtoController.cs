using Microsoft.AspNetCore.Mvc;
using Estoque.Dominio.Models;
using Estoque.Servicos;
using Estoque.Dominio.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using SQLitePCL;

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

    [HttpGet]
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
        try
        {
            var produto = _controleEstoque.BuscarProduto(id);

            if (produto == null)
                return NotFound(new { Mensagem = "produto não encontrado no sistema" });
            return Ok(produto);
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }

    }
    [HttpPut("{id}/atualizar")]
    public IActionResult Atualizar(int id, string? nome = null, int? estoqueMinimo = null)
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

    [HttpPatch("{id}/entrada")]
    public IActionResult Entrada(int id, [FromBody] int qtd)
    {
        _controleEstoque.EntradaEstoque(id, qtd);
        return Ok();
    }

    [HttpPost("{id}/saida")]
    public IActionResult SaidaEstoque(int id, [FromBody] int quantidade)
    {
        try
        {
            _controleEstoque.RegistrarSaidaEstoque(id, quantidade);
            return Ok("Saída registrada com sucesso.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpDelete("{id}/deletar")]
    public IActionResult deletar(int id)
    {
        _controleEstoque.RemoverProduto(id);
        return Ok();
    }
}