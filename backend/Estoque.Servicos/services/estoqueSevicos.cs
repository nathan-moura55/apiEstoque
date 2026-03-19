using Estoque.Dominio.Models;
using Estoque.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Estoque.Servicos
{
    public class ControleDeEstoque : IControleDeEstoque
    {
        private readonly IProdutoRepositorio _produtoRepo;

        public ControleDeEstoque(IProdutoRepositorio produtoRepo)
        {
            _produtoRepo = produtoRepo;
        }

        public IEnumerable<Produto> ListarTodos() => _produtoRepo.ObterTodos();

        public Produto BuscarProduto(int id)
        {
            var produto = _produtoRepo.ObterPorId(id);
            if (produto == null) throw new Exception("Produto não encontrado.");
            return produto;
        }

        public void AdicionarProduto(string nome, int quantidade, int estoqueMinimo)
        {
            if (_produtoRepo.ObterTodos().Any(p => p.Nome.Equals(nome, StringComparison.OrdinalIgnoreCase)))
                throw new Exception("Já existe um produto com este nome.");

            var novo = new Produto(0, nome, quantidade, estoqueMinimo);
            _produtoRepo.Adicionar(novo);
        }

        public void AtualizarProduto(int id, string? novoNome, int? novoMinimo)
        {
            var produto = BuscarProduto(id);
            if (!string.IsNullOrWhiteSpace(novoNome)) produto.AtualizarNome(novoNome);
            if (novoMinimo.HasValue) produto.AtualizarEstoqueMinimo(novoMinimo.Value);

            _produtoRepo.Atualizar(produto);
        }

        public void EntradaEstoque(int id, int quantidade)
        {
            var produto = _produtoRepo.ObterPorId(id);

            if (produto == null)
                throw new Exception("Produto não encontrado para dar entrada.");

            produto.AdicionarEstoque(quantidade);

            _produtoRepo.Atualizar(produto);
        }

        public void RegistrarSaidaEstoque(int id, int quantidade)
        {
            var produto = BuscarProduto(id);
            produto.RemoverEstoque(quantidade);
            _produtoRepo.Atualizar(produto);
        }

        public void RemoverProduto(int id)
        {
            var produto = BuscarProduto(id);
            if (produto.Quantidade > 0)
                throw new Exception("Não é possível excluir um produto que ainda tem estoque.");

            _produtoRepo.Remover(id);
        }
    }
}