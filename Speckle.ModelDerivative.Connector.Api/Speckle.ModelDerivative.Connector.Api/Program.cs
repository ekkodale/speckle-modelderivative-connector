using Microsoft.OpenApi.Models;
using Speckle.Core.Credentials;
using Speckle.Core.Api;
using Speckle.ModelDerivative.Connector.Api.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// ------------------------------------------------------------------------------------
//  Configure swagger
// ------------------------------------------------------------------------------------
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Speckle Model Derivative Connector API",
        Description = "An ASP.NET Core Web API for Speckle Model Derivative Connector",
    });
});

// ------------------------------------------------------------------------------------
//  Configuration.
// ------------------------------------------------------------------------------------
builder.Configuration
         .AddJsonFile("appsettings.json", false, true)
         .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
         .AddEnvironmentVariables();

// ------------------------------------------------------------------------------------
//  Configure speckle.
// ------------------------------------------------------------------------------------
string serverUrl = builder.Configuration["Speckle:Server"];
string token = builder.Configuration["Speckle:PersonalAccessToken"];

ServerInfo serverinfo = await AccountManager.GetServerInfo(serverUrl);
UserInfo userinfo = await AccountManager.GetUserInfo(token, serverUrl);

var account = new Account { isDefault = true, token = token, serverInfo = serverinfo, userInfo = userinfo };
var speckleClient = new Client(account);

string corsPolicy = "PublicCorsPolicy";
builder.Services.AddCors(p => p.AddPolicy(corsPolicy, builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddTransient<IModelService, ModelService>();

builder.Services.AddSingleton(speckleClient);

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
   
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.RoutePrefix = "";
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
});

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseCors(corsPolicy);

app.Run();
