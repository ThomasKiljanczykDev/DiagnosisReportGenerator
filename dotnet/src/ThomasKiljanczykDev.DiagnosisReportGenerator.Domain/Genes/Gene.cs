using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;
using Volo.Abp.Domain.Entities;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;

public class Gene : Entity<Guid>
{
    public required string Name { get; set; }

    public virtual ICollection<TestMethod> TestMethods { get; set; } = new List<TestMethod>();
    public virtual ICollection<Mutation> Mutations { get; set; } = new List<Mutation>();
}