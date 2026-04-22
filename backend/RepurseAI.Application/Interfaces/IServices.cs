using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RepurseAI.Domain.Entities;

namespace RepurseAI.Application.Interfaces;

public record TranscriptionWord(string Word, double Start, double End, double Confidence);
public record TranscriptionResult(string Text, List<TranscriptionWord> Words);

public interface ITranscriptionService {
    Task<TranscriptionResult> TranscribeAsync(string path);
}

public interface IContentGenerationService {
    Task<string> GenerateAllFormatsAsync(string transcript);
}

public interface IAppDbContext {
    DbSet<Organization> Organizations { get; }
    DbSet<Workspace> Workspaces { get; }
    DbSet<OrganizationMember> OrganizationMembers { get; }
    DbSet<RepurposedContent> RepurposedContents { get; }
    DbSet<ClipKeyword> ClipKeywords { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    Task<int> SaveChangesAsync(System.Threading.CancellationToken ct = default);
}
