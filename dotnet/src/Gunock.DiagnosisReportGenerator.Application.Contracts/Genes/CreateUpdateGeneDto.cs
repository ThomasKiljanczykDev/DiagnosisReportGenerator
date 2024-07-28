using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;

public class CreateUpdateGeneDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }

    [Required]
    public required Guid[] TestMethodIds { get; init; }

    [Required]
    public required Guid[] MutationIds { get; init; }
}