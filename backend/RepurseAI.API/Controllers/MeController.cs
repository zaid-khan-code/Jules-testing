using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepurseAI.Infrastructure.Data;
using RepurseAI.Domain.Entities;

namespace RepurseAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MeController(UserManager<ApplicationUser> userManager, AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetMe()
    {
        var userId = User.FindFirst("userId")?.Value;
        if (userId == null) return Unauthorized();
        var user = await userManager.FindByIdAsync(userId);
        if (user == null) return NotFound();
        await context.Entry(user).Collection(u => u.OrganizationMemberships).LoadAsync();
        foreach (var om in user.OrganizationMemberships) await context.Entry(om).Reference(m => m.Organization).LoadAsync();
        var currentOrg = user.OrganizationMemberships.FirstOrDefault(om => om.OrganizationId == user.ActiveOrganizationId);
        var workspaces = await context.Workspaces.Where(w => w.OrganizationId == user.ActiveOrganizationId).ToListAsync();
        return Ok(new { user.Email, Organization = currentOrg?.Organization.Name, workspaces = workspaces.Select(w => new { w.Id, w.Name }) });
    }
}
