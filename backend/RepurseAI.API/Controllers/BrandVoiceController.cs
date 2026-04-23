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
public class BrandVoiceController(IAppDbContext context) : ControllerBase {
    [HttpGet("{workspaceId}")]
    public async Task<IActionResult> Get(Guid workspaceId) {
        var profile = await context.BrandVoiceProfiles.FirstOrDefaultAsync(p => p.WorkspaceId == workspaceId);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpPost]
    public async Task<IActionResult> Update([FromBody] BrandVoiceProfile profile) {
        var existing = await context.BrandVoiceProfiles.FirstOrDefaultAsync(p => p.WorkspaceId == profile.WorkspaceId);
        if (existing == null) {
            context.BrandVoiceProfiles.Add(profile);
        } else {
            existing.Tone = profile.Tone;
            existing.Description = profile.Description;
            existing.TargetAudience = profile.TargetAudience;
            existing.Vocabulary = profile.Vocabulary;
        }
        await context.SaveChangesAsync();
        return Ok();
    }
}
