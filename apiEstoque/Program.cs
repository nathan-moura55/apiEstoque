using Microsoft.EntityFrameworkCore;
using Estoque.Repositorio.Data;
using Estoque.Repositorio; 
using Estoque.Servicos;    
using Estoque.Dominio.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite("Data Source=../estoque.db"));

builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorioSql>();
builder.Services.AddScoped<IControleDeEstoque, ControleDeEstoque>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();