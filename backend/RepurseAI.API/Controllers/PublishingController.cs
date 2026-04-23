using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepurseAI.Application.Interfaces;
using RepurseAI.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace RepurseAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PublishingController(IAppDbContext context) : ControllerBase {
    [HttpGet("accounts/{workspaceId}")]
    public async Task<IActionResult> GetAccounts(Guid workspaceId) {
        var accounts = await context.ConnectedAccounts.Where(a => a.WorkspaceId == workspaceId).ToListAsync();
        return Ok(accounts);
    }

    [HttpPost("publish")]
    public async Task<IActionResult> Publish([FromBody] PublishRequest req) {
        // Mock publishing logic
        return Ok(new { Success = true, Message = $"Published to {req.Platform}" });
    }
}

public record PublishRequest(Guid WorkspaceId, string Platform, string Content);
