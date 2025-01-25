using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;
using Volo.Abp.Domain.Entities;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;

public class Mutation : Entity<Guid>
{
    public required string Name { get; set; }

    public virtual ICollection<Gene> Genes { get; set; } = new List<Gene>();
}