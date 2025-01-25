using System.ComponentModel.DataAnnotations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Recommendations;
using Range = ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Recommendations;

public class CreateUpdateRecommendationDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }

    [Required]
    public required string Content { get; init; }

    [Required]
    public required RecommendationLevel Level { get; init; }

    [Range(1, int.MaxValue)]
    public int Priority { get; init; } = int.MaxValue;

    [Required]
    public required Range AgeRange { get; init; }
}