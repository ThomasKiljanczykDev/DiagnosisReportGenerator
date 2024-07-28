using System.ComponentModel.DataAnnotations;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Illnesses;

public class CreateUpdateIllnessDto
{
    [Required]
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }

    [Required]
    public required Guid[] RecommendationIds { get; init; }
}