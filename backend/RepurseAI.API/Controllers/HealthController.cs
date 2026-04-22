using Microsoft.AspNetCore.Mvc;
namespace RepurseAI.API.Controllers;
[ApiController]
[Route("health")]
public class HealthController : ControllerBase {
    [HttpGet]
    public IActionResult Check() => Ok(new { Status = "Healthy", Time = System.DateTime.UtcNow });
}
