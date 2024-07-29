using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;

public class CreateUpdateDiagnosisDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }

    [Required]
    public required Guid[] RecommendationIds { get; init; }
}