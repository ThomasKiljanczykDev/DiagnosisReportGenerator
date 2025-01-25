using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;
using Volo.Abp.Domain.Entities;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;

public class TestMethod : Entity<Guid>
{
    public required string Name { get; set; }

    public virtual ICollection<Gene> Genes { get; set; } = new List<Gene>();
}