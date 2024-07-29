using Gunock.DiagnosisReportGenerator.Domain.Diagnoses;
using Gunock.DiagnosisReportGenerator.Domain.Illnesses;
using Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations;
using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Recommendations;

public class Recommendation : Entity<Guid>
{
    public required string Name { get; set; }

    public required string Content { get; set; }

    public required RecommendationLevel Level { get; set; }

    public required int Priority { get; set; }

    public int? AgeFrom { get; set; }

    public int? AgeTo { get; set; }

    public virtual ICollection<Diagnosis> Diagnoses { get; set; } = new List<Diagnosis>();
    public virtual ICollection<Illness> Illnesses { get; set; } = new List<Illness>();
}