using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RepurseAI.Application.Interfaces;
using RepurseAI.Domain.Entities;

namespace RepurseAI.Application.Services;

public class RepurposePipeline(IAppDbContext db, ITranscriptionService ts, IContentGenerationService gs) {
    public async Task ProcessAsync(Guid id) {
        var content = await db.RepurposedContents.FindAsync(id);
        if (content == null) return;
        content.Status = "Transcribing";
        await db.SaveChangesAsync();
        var tr = await ts.TranscribeAsync(content.SourceUrl);
        content.Status = "Generating";
        await db.SaveChangesAsync();
        content.Outputs = await gs.GenerateAllFormatsAsync(tr.Text);
        content.Status = "Completed";
        content.Progress = 100;
        await db.SaveChangesAsync();
    }
}
