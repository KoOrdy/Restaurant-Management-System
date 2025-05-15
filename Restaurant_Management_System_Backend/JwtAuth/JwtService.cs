using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using resturantApi.Models;

public class JwtService
{
    private readonly string _secret;
    private readonly double _expirationMinutes;

    public JwtService(IConfiguration config)
    {
        _secret = config["JwtSettings:SecretKey"];
        _expirationMinutes = double.Parse(config["JwtSettings:ExpirationMinutes"]);
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim("id", user.Id.ToString()),
            new Claim("role", user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "restaurant",
            audience: "restaurant",
            claims: claims,
            expires: DateTime.Now.AddMinutes(_expirationMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
