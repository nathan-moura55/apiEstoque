namespace Estoque.Dominio.Models
{
    public class Usuario
    {
        public int Id { get; private set; }
        public string Nome { get; private set; }
        public string Cargo {get; private set; }

        public Usuario(int id, string nome, string cargo)
        {
            Id = id;
            Nome = nome;
            Cargo = cargo;
        }

        public void NovoId(int novoId)
        {
             Id = novoId;
        }

        public void NovoNome(string novoNome)
        {
             Nome = novoNome;
        }

        public void NovoCargo(string novoCargo)
        {
             Cargo = novoCargo;
        }
        

        public override string ToString()
        {
            return $"ID: {Id} | NOME: {Nome} | CARGO: {Cargo}";
        }
    }
}