using BankingSystem.Entity.Context;
using BankingSystem.ExtensionMethod;
using BankingSystem.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.RegisterServices();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<BankingSystemContext>();
    bool dbIsCreated = dbContext.Database.EnsureCreatedAsync().Result;
    if (dbIsCreated)
    {
        Console.WriteLine($"Database Created!!!");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();


/*
 add-migration <addedUser>
 update-database
*/
