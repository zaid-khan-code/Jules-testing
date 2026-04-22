using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepurseAI.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace RepurseAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AgencyController(IAppDbContext context) : ControllerBase {
    [HttpGet("usage")]
    public async Task<IActionResult> GetUsage() {
        var userId = User.FindFirst("userId")?.Value;
        var jobs = await context.RepurposedContents.CountAsync();
        return Ok(new { JobsRun = jobs, StorageUsed = jobs * 15, CreditsRemaining = 500 - jobs });
    }
}
