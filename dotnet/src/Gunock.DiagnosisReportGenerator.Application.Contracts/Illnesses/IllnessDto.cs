using Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Illnesses;

public class IllnessDto : EntityDto<Guid>
{
    public required string Name { get; init; }

    public required Guid[] RecommendationIds { get; init; }
}