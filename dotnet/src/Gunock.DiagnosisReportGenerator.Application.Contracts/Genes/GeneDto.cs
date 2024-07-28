using Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;
using Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;

public class GeneDto : EntityDto<Guid>
{
    public required string Name { get; init; }

    public required Guid[] TestMethodIds { get; init; }
    public required Guid[] MutationIds { get; init; }
}