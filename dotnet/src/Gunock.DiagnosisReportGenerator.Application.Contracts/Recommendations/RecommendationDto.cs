using System.ComponentModel.DataAnnotations;
using Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations;
using Volo.Abp.Application.Dtos;
using Range = Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;

public class RecommendationDto : EntityDto<Guid>
{
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }

    [StringLength(int.MaxValue, MinimumLength = 1)]
    public required string Content { get; init; }

    public required RecommendationLevel Level { get; init; }

    public required int Priority { get; init; }

    public required Range AgeRange { get; init; }
}