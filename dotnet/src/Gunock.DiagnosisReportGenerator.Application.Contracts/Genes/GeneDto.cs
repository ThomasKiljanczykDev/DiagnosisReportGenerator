using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;

public class GeneDto : EntityDto<Guid>
{
    [Required]
    public required string Name { get; init; }

    [Required]
    public required Guid[] TestMethodIds { get; init; }

    [Required]
    public required Guid[] MutationIds { get; init; }
}