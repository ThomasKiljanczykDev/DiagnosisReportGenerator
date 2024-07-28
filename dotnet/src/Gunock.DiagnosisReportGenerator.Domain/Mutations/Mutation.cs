using Gunock.DiagnosisReportGenerator.Domain.Genes;
using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Mutations;

public class Mutation : Entity<Guid>
{
    public required string Name { get; set; }

    public virtual ICollection<Gene> Genes { get; set; } = new List<Gene>();
}