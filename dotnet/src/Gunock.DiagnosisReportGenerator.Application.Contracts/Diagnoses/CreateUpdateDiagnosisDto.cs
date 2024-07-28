using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;

public class CreateUpdateDiagnosisDto
{
    [Required]
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }
}