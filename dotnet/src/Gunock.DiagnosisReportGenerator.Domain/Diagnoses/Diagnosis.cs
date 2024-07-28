using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Diagnoses;

public class Diagnosis(
    Guid id
) : Entity<Guid>(id)
{
    public required string Name { get; set; }
}