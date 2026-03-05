namespace Estoque.Dominio.Models;

public class LogEstoque
{
    public int Id { get; private set; }
    public int ProdutoId { get; private set; }
    public string NomeProduto { get; private set; }
    public int UsuarioId { get; private set; }
    public string NomeUsuario { get; private set; }
    public string Operacao { get; private set; }
    public int QuantidadeAlterada { get; private set; }
    public DateTime Data { get; private set; }

    private LogEstoque()
    {
        NomeProduto = string.Empty;
        NomeUsuario = string.Empty;
        Operacao = string.Empty;
    }
    public LogEstoque(int produtoId, string nomeProduto, int usuarioId, string nomeUsuario, string operacao, int quantidadeAlterada)
    {
        ProdutoId = produtoId;
        NomeProduto = nomeProduto;
        UsuarioId = usuarioId;
        NomeUsuario = nomeUsuario;
        Operacao = operacao;
        QuantidadeAlterada = quantidadeAlterada;
        Data = DateTime.Now;
    }
}