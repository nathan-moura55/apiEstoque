using Microsoft.AspNetCore.Mvc;
using Estoque.Dominio.Interfaces;
using Estoque.Dominio.Models;

namespace Estoque.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepositorio _repo;

        public UsuarioController(IUsuarioRepositorio repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_repo.ObterTodos());
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var usuario = _repo.ObterPorId(id);
            if (usuario == null) return NotFound("Usuário não encontrado.");
            return Ok(usuario);
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Usuario usuario)
        {
            _repo.Adicionar(usuario);
            return CreatedAtAction(nameof(ObterPorId), new { id = usuario.Id }, usuario);
        }
    }
}