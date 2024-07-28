using Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Illnesses;

public class IllnessDto : EntityDto<Guid>
{
    public required string Name { get; init; }

    // TODO: Add special DTO
    public required RecommendationDto[] Recommendations { get; init; }
}