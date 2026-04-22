using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using RepurseAI.Application.Interfaces;

namespace RepurseAI.Infrastructure.Services.Mocks;

public class MockTranscriptionService : ITranscriptionService {
    public Task<TranscriptionResult> TranscribeAsync(string p) => Task.FromResult(new TranscriptionResult(
        "Welcome to the RepurseAI demo. Content repurposing is the key thing for growth.",
        new List<TranscriptionWord> { new("Welcome", 0, 1, 0.99) }
    ));
}

public class MockContentGenerationService : IContentGenerationService {
    public Task<string> GenerateAllFormatsAsync(string t) => Task.FromResult(JsonSerializer.Serialize(new {
        linkedin = "🚀 AI is the future of content!",
        newsletter = "Welcome to the future of content automation.",
        twitter = new[] {"1/ AI is changing everything.", "2/ Save hours with RepurseAI!"},
        blog = "# The Content Revolution\n\nAI helps you scale your brand...",
        youtube = "Don't forget to like and subscribe!",
        chapters = new[] { new { time = "00:00", title = "Intro" }, new { time = "01:20", title = "Demo" } },
        notes = "Session notes for podcast creators.",
        quotes = new[] { "Repurpose or perish.", "AI is your leverage." },
        tldr = new[] { "Save 5 hours/week", "Multi-platform reach", "Editable outputs" },
        cta = "Join the waitlist at repurse.ai",
        clips = new[] { new { Start = 0, End = 45, Title = "Hook Segment", Score = 92 } }
    }));
}
