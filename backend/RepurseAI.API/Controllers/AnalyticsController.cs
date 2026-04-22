using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepurseAI.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace RepurseAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AnalyticsController(IAppDbContext context) : ControllerBase {
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard() {
        var count = await context.RepurposedContents.CountAsync();
        return Ok(new { TotalGenerated = count, AvgEngagement = 85, TopPlatform = "LinkedIn" });
    }
}
