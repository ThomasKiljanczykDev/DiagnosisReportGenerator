using System.ComponentModel.DataAnnotations;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Mutations;

public class CreateUpdateMutationDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }
}