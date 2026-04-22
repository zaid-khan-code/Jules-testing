using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RepurseAI.Domain.Entities;
using RepurseAI.Application.Interfaces;

namespace RepurseAI.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<ApplicationUser>(options), IAppDbContext {
    public DbSet<Organization> Organizations => Set<Organization>();
    public DbSet<Workspace> Workspaces => Set<Workspace>();
    public DbSet<OrganizationMember> OrganizationMembers => Set<OrganizationMember>();
    public DbSet<RepurposedContent> RepurposedContents => Set<RepurposedContent>();
    public DbSet<ClipKeyword> ClipKeywords => Set<ClipKeyword>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    protected override void OnModelCreating(ModelBuilder b) {
        base.OnModelCreating(b);
        b.Entity<OrganizationMember>().HasKey(om => new { om.OrganizationId, om.UserId });
    }
}
