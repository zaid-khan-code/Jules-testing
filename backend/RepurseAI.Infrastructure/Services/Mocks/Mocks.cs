using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using RepurseAI.Application.Interfaces;

namespace RepurseAI.Infrastructure.Services.Mocks;

public class MockTranscriptionService : ITranscriptionService {
    public Task<TranscriptionResult> TranscribeAsync(string p, string? l = null) => Task.FromResult(new TranscriptionResult(
        "Welcome to the RepurseAI demo. Content repurposing is the key thing for growth.",
        new List<TranscriptionWord> {
            new("Welcome", 0, 1, 0.99, "Speaker A"),
            new("to", 1, 1.2, 0.98, "Speaker A"),
            new("the", 1.2, 1.4, 0.99, "Speaker A"),
            new("RepurseAI", 1.4, 2, 0.95, "Speaker A"),
            new("demo.", 2, 2.5, 0.97, "Speaker A"),
            new("Content", 3, 3.5, 0.99, "Speaker B"),
            new("repurposing", 3.5, 4.5, 0.98, "Speaker B")
        },
        l ?? "en"
    ));
}

public class MockContentGenerationService : IContentGenerationService {
    public Task<string> GenerateAllFormatsAsync(string t, string? tone = null, string? targetLanguage = null) => Task.FromResult(JsonSerializer.Serialize(new {
        linkedin = "🚀 AI is the future of content! " + (tone ?? "Professional"),
        newsletter = "Welcome to the future of content automation.",
        twitter = new[] {"1/ AI is changing everything.", "2/ Save hours with RepurseAI!"},
        blog = "# The Content Revolution\n\nAI helps you scale your brand...",
        youtube = "Don't forget to like and subscribe!",
        chapters = new[] { new { time = "00:00", title = "Intro" }, new { time = "01:20", title = "Demo" } },
        notes = "Session notes for podcast creators.",
        quotes = new[] { "Repurpose or perish.", "AI is your leverage." },
        tldr = new[] { "Save 5 hours/week", "Multi-platform reach", "Editable outputs" },
        cta = "Join the waitlist at repurse.ai",
        instagram = "New post alert! Check out our latest video on AI content.",
        facebook = "We're revolutionizing content creation. Read more below.",
        pinterest = "Visual guide to content repurposing.",
        reddit = "I built an AI that turns one video into 30 pieces of content.",
        cold_email = "Hi, I saw your content and thought RepurseAI could help...",
        press_release = "FOR IMMEDIATE RELEASE: RepurseAI launches 1000 features.",
        faq = new[] { new { q = "What is RepurseAI?", a = "A content repurposing SaaS." } },
        glossary = new[] { new { term = "Diarization", definition = "Labeling speakers in audio." } },
        calendar = "Post to LinkedIn on Monday at 9 AM.",
        hashtags = new[] { "#AI", "#ContentMarketing", "#SaaS" },
        hook = new[] { "Stop wasting time on manual editing.", "Your content is working hard, but are you?" },
        seo = new { title = "RepurseAI - Scale Your Content", description = "The ultimate content repurposing tool for creators." },
        clips = new[] { new { Start = 0, End = 45, Title = "Hook Segment", Score = 92 } }
    }));
}
