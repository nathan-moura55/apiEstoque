# Fluxo API - Gestão de Estoque

Backend robusto desenvolvido em .NET para o controle de movimentação de produtos, integração com banco de dados PostgreSQL e suporte a operações assíncronas.

## Tecnologias Utilizadas
- **C# / .NET Core** (API REST)
- **Entity Framework Core** (ORM)
- **PostgreSQL** (Banco de Dados)
- **LINQ** (Manipulação de Dados)

## Configuração do Ambiente

### 1. Banco de Dados
Certifique-se de que o PostgreSQL está rodando e configure a string de conexão no arquivo `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=apiEstoque;Username=postgres;Password=SUA_SENHA"
}