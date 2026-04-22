using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace RepurseAI.Domain.Entities;

public class ApplicationUser : IdentityUser {
    public string? DisplayName { get; set; }
    public Guid ActiveOrganizationId { get; set; }
    public virtual ICollection<OrganizationMember> OrganizationMemberships { get; set; } = new List<OrganizationMember>();
    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}

public class Organization {
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public virtual ICollection<Workspace> Workspaces { get; set; } = new List<Workspace>();
    public virtual ICollection<OrganizationMember> Members { get; set; } = new List<OrganizationMember>();
}

public class Workspace {
    public Guid Id { get; set; }
    public Guid OrganizationId { get; set; }
    public string Name { get; set; } = null!;
    public string? BrandColor { get; set; }
    public virtual Organization Organization { get; set; } = null!;
}

public class OrganizationMember {
    public Guid OrganizationId { get; set; }
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
    public virtual Organization Organization { get; set; } = null!;
    public virtual ApplicationUser User { get; set; } = null!;
}

public class RefreshToken {
    public Guid Id { get; set; }
    public string Token { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
}

public class RepurposedContent {
    public Guid Id { get; set; }
    public Guid WorkspaceId { get; set; }
    public string SourceUrl { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Status { get; set; } = "Queued";
    public string? Outputs { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Progress { get; set; }
}

public class ClipKeyword {
    public int Id { get; set; }
    public string Phrase { get; set; } = null!;
}
