using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.TestMethods;

public class TestMethod(
    Guid id
) : Entity<Guid>(id)
{
    public required string Name { get; set; }
}