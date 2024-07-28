using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;

public class DiagnosisDto : EntityDto<Guid>
{
    public required string Name { get; init; }
}