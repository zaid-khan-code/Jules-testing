using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepurseAI.Application.Interfaces;
using RepurseAI.Domain.Entities;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RepurseAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrganizationController(IAppDbContext context) : ControllerBase {
    [HttpPost("switch/{orgId}")]
    public IActionResult Switch(Guid orgId) => Ok(new { CurrentOrgId = orgId });

    [HttpGet("workspaces")]
    public async Task<IActionResult> GetWorkspaces() => Ok(await context.Workspaces.ToListAsync());
}
