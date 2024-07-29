using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Illnesses;

public class CreateUpdateIllnessDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }

    [Required]
    public required Guid[] RecommendationIds { get; init; }
}