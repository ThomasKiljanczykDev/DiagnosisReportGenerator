using System.ComponentModel.DataAnnotations;
using Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations;
using Range = Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;

public class CreateUpdateRecommendationDto
{
    [Required]
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }

    [Required]
    [StringLength(int.MaxValue, MinimumLength = 1)]
    public required string Content { get; init; }

    [Required]
    public required RecommendationLevel Level { get; init; }

    [Required]
    public required int Priority { get; init; }

    [Required]
    public required Range AgeRange { get; init; }
}