using Microsoft.EntityFrameworkCore;
using Estoque.Repositorio.Data;
using Estoque.Repositorio;
using Estoque.Servicos;
using Estoque.Dominio.Interfaces;
using Estoque.Dominio.Models;
using DotNetEnv;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Porta padrão do Vite
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

builder.Services.AddControllers();

builder.Services.AddDbContext<EstoqueDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorioSql>();
builder.Services.AddScoped<ILogRepositorio, LogRepositorioSql>();
builder.Services.AddScoped<IUsuarioRepositorio, UsuarioRepositorioSql>();
builder.Services.AddScoped<IControleDeEstoque, ControleDeEstoque>();
builder.Services.AddScoped<ISessaoUsuario, SessaoUsuarioMock>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();