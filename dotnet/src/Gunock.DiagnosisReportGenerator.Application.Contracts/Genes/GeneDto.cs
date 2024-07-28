using Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;
using Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;

public class GeneDto : EntityDto<Guid>
{
    public required string Name { get; init; }

    // TODO: Add special DTO
    public required TestMethodDto[] TestMethods { get; init; }
    // TODO: Add special DTO
    public required MutationDto[] Mutations { get; init; }
}