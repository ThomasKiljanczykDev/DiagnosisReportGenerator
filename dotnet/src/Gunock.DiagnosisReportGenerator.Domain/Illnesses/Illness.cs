using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Illnesses;

public class Illness(
    Guid id
) : Entity<Guid>(id)
{
    public required string Name { get; set; }

    public virtual ICollection<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
}