using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using RepurseAI.Application.Interfaces;
using RepurseAI.Application.Services;
using RepurseAI.Domain.Entities;
using System;
using System.Threading.Tasks;
using Hangfire;

namespace RepurseAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RepurposeController(IAppDbContext db, IBackgroundJobClient jobs) : ControllerBase {
    [HttpPost("process")]
    public async Task<IActionResult> Process([FromBody] ProcessRequest req) {
        var content = new RepurposedContent { WorkspaceId = req.WorkspaceId, SourceUrl = req.Url, Title = "New" };
        db.RepurposedContents.Add(content);
        await db.SaveChangesAsync();
        jobs.Enqueue<RepurposePipeline>(x => x.ProcessAsync(content.Id));
        return Ok(new { content.Id });
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id) => Ok(await db.RepurposedContents.FindAsync(id));
}
public record ProcessRequest(Guid WorkspaceId, string Url);
