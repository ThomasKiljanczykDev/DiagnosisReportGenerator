using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Diagnoses;

public class Diagnosis : Entity<Guid>
{
    public required string Name { get; set; }

    public virtual ICollection<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
}