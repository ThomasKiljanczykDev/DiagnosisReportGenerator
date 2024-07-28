using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;

public class CreateUpdateMutationDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }
}