using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RepurseAI.Domain.Entities;

namespace RepurseAI.Application.Interfaces;

public record TranscriptionWord(string Word, double Start, double End, double Confidence, string? Speaker = null);
public record TranscriptionResult(string Text, List<TranscriptionWord> Words, string? Language = null);

public interface ITranscriptionService {
    Task<TranscriptionResult> TranscribeAsync(string path, string? language = null);
}

public interface IContentGenerationService {
    Task<string> GenerateAllFormatsAsync(string transcript, string? tone = null, string? targetLanguage = null);
}

public interface IAppDbContext {
    DbSet<Organization> Organizations { get; }
    DbSet<Workspace> Workspaces { get; }
    DbSet<OrganizationMember> OrganizationMembers { get; }
    DbSet<RepurposedContent> RepurposedContents { get; }
    DbSet<ClipKeyword> ClipKeywords { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<ConnectedAccount> ConnectedAccounts { get; }
    DbSet<BrandVoiceProfile> BrandVoiceProfiles { get; }
    Task<int> SaveChangesAsync(System.Threading.CancellationToken ct = default);
}
