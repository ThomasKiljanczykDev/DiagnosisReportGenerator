using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Domain.Entities;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Diagnoses;

public class Diagnosis : Entity<Guid>
{
    public required string Name { get; set; }

    public virtual ICollection<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
}