using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.TestMethods;

public class TestMethod : Entity<Guid>
{
    public required string Name { get; set; }
}