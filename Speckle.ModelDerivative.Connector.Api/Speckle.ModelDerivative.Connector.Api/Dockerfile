#Get base SDK Image from microsoft
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY /bin/Release/net6.0 /app


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS http://*:5001
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 5001

COPY --from=build /app .

ENTRYPOINT ["dotnet", "Speckle.ModelDerivative.Connector.Api.dll"]