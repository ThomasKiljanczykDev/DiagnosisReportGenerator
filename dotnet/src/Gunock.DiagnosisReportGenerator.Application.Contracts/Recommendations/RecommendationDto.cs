using Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations;
using Volo.Abp.Application.Dtos;
using Range = Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;

public class RecommendationDto : EntityDto<Guid>
{
    public required string Name { get; init; }

    public required string Content { get; init; }

    public required RecommendationLevel Level { get; init; }

    public required int Priority { get; init; }

    public required Range AgeRange { get; init; }
}