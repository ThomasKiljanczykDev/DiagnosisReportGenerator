using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Diagnoses;

public class Diagnosis : Entity<Guid>
{
    public required string Name { get; set; }
}