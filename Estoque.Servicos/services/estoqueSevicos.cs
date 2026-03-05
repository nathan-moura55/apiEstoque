using Estoque.Dominio.Models;
using Estoque.Dominio.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Estoque.Servicos
{
    public class ControleDeEstoque : IControleDeEstoque
    {
        private readonly IProdutoRepositorio _produtoRepo;
        private readonly IUsuarioRepositorio _usuarioRepo;
        private readonly ISessaoUsuario _sessao;
        private readonly ILogRepositorio _logRepo;

        public ControleDeEstoque(
            IProdutoRepositorio produtoRepo,
            IUsuarioRepositorio usuarioRepo,
            ILogRepositorio logRepo,
            ISessaoUsuario sessao
            )
        {
            _produtoRepo = produtoRepo;
            _usuarioRepo = usuarioRepo;
            _logRepo = logRepo;
            _sessao = sessao;
        }

        public void AdicionarProduto(string nome, int quantidade, int estoqueMinimo)
        {
            if (_produtoRepo.ObterTodos().Any(p => p.Nome.Equals(nome, StringComparison.OrdinalIgnoreCase)))
            {
                throw new Exception("Produto com esse nome já existe.");
            }

            var novoProduto = new Produto(0, nome, quantidade, estoqueMinimo);
            _produtoRepo.Adicionar(novoProduto);
        }

        public void AtualizarProduto(int id, string? novoNome = null, int? novoMinimo = null)
        {
            var produto = BuscarProduto(id);

            if (produto == null)
                throw new Exception("Produto não encontrado.");

            if (!string.IsNullOrWhiteSpace(novoNome))
            {
                produto.AtualizarNome(novoNome);
            }

            if (novoMinimo.HasValue)
            {
                produto.AtualizarEstoqueMinimo(novoMinimo.Value);
            }

            _produtoRepo.Atualizar(produto);
        }

        public Produto BuscarProduto(int id)
        {
            var produto = _produtoRepo.ObterPorId(id);
            if (produto == null) throw new Exception("Produto não encontrado.");
            return produto;
        }

        public void EntradaEstoque(int id, int quantidade)
        {
            var produto = _produtoRepo.ObterPorId(id);
            var usuario = _usuarioRepo.ObterPorId(id);

            if (produto == null || usuario == null)
                throw new Exception("Produto ou Usuário não encontrado.");

            produto.AdicionarEstoque(quantidade);
            _produtoRepo.Atualizar(produto);

            var log = new LogEstoque(
                produto.Id,
                produto.Nome,
                usuario.Id,
                usuario.Nome,
                "Entrada",
                quantidade
            );

            _logRepo.SalvarLog(log);
        }

        public void RegistrarSaidaEstoque(int id, int quantidade)
        {
            var produto = _produtoRepo.ObterPorId(id);
            var usuarioId = _sessao.ObterUsuarioLogadoId();
            var usuario = _usuarioRepo.ObterPorId(usuarioId);

            if (produto == null || usuario == null)
                throw new Exception("Produto ou Usuário não encontrado.");

            produto.RemoverEstoque(quantidade);

            if (produto.AbaixoDoMinimo())
            {
                Console.WriteLine($"[ALERTA] Produto '{produto.Nome}' está abaixo do estoque mínimo.");
            }

            _produtoRepo.Atualizar(produto);

            var log = new LogEstoque(
                produto.Id,
                produto.Nome,
                usuario.Id,
                usuario.Nome,
                "Saida",
                quantidade
            );

            _logRepo.SalvarLog(log);
        }

        public void RemoverProduto(int id)
        {
            var produto = _produtoRepo.ObterPorId(id);

            if (produto == null)
                throw new Exception("Produto não encontrado.");

            if (produto.Quantidade > 0)
                throw new Exception("Não é possível excluir um produto com estoque residual.");

            _produtoRepo.Remover(id);
        }

        public IEnumerable<Produto> ListarTodos()
        {
            return _produtoRepo.ObterTodos();
        }
    }
}