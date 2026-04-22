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
    public virtual BrandVoiceProfile? BrandVoice { get; set; }
    public virtual ICollection<ConnectedAccount> ConnectedAccounts { get; set; } = new List<ConnectedAccount>();
}

public class BrandVoiceProfile {
    public Guid Id { get; set; }
    public Guid WorkspaceId { get; set; }
    public string Description { get; set; } = "";
    public string Tone { get; set; } = "Professional";
    public string TargetAudience { get; set; } = "";
    public string Vocabulary { get; set; } = "";
}

public class ConnectedAccount {
    public Guid Id { get; set; }
    public Guid WorkspaceId { get; set; }
    public string Platform { get; set; } = null!; // LinkedIn, Twitter, etc.
    public string AccessToken { get; set; } = null!;
    public string? RefreshToken { get; set; }
    public DateTime? ExpiresAt { get; set; }
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

    // Additional Metadata (Category 12)
    public string? Tags { get; set; }
    public string? Notes { get; set; }
    public string? Language { get; set; }
    public string? SourceType { get; set; } // YouTube, Podcast, Upload
    public double? ViralityScore { get; set; }
}

public class ClipKeyword {
    public int Id { get; set; }
    public string Phrase { get; set; } = null!;
}
