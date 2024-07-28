using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;

public class MutationDto : EntityDto<Guid>
{
    public required string Name { get; init; }
}