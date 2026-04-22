using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RepurseAI.Domain.Entities;
using RepurseAI.Infrastructure.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace RepurseAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration, AppDbContext context) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        {
            var claims = new[] { new Claim("userId", user.Id), new Claim(JwtRegisteredClaimNames.Sub, user.Email!) };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? "a_very_long_secret_key_at_least_32_chars_long"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer: "repurseai", audience: "repurseai", claims: claims, expires: DateTime.UtcNow.AddMinutes(15), signingCredentials: creds);
            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
        var result = await userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            var org = new Organization { Id = Guid.NewGuid(), Name = $"{model.Email}'s Org" };
            context.Organizations.Add(org);
            await context.SaveChangesAsync();
            context.OrganizationMembers.Add(new OrganizationMember { OrganizationId = org.Id, UserId = user.Id, Role = "owner" });
            user.ActiveOrganizationId = org.Id;
            await userManager.UpdateAsync(user);
            await context.SaveChangesAsync();
            return Ok(new { Message = "User registered successfully" });
        }
        return BadRequest(result.Errors);
    }
}
public record LoginModel(string Email, string Password);
public record RegisterModel(string Email, string Password);
