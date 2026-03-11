namespace Estoque.Servicos
{
    public interface ISessaoUsuario
    {
        int ObterUsuarioLogadoId();
    }

    public class SessaoUsuarioMock : ISessaoUsuario
    {
        public int ObterUsuarioLogadoId()
        {
            return 1;
        }
    }
}