using System.ComponentModel.DataAnnotations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Recommendations;
using Volo.Abp.Application.Dtos;
using Range = ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Recommendations;

public class RecommendationDto : EntityDto<Guid>
{
    [Required]
    public required string Name { get; init; }

    [Required]
    public required string Content { get; init; }

    [Required]
    public required RecommendationLevel Level { get; init; }

    [Required]
    [Range(1, int.MaxValue)]
    public required int Priority { get; init; }

    [Required]
    public required Range AgeRange { get; init; }
}