using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Illnesses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Illnesses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Illnesses;

public class IllnessAppService(
    IIllnessRepository illnessRepository,
    IRecommendationRepository recommendationRepository
) : CrudAppService<Illness, IllnessDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateIllnessDto>(
        illnessRepository
    ),
    IIllnessAppService
{
    protected override async Task<Illness> MapToEntityAsync(CreateUpdateIllnessDto createInput)
    {
        var recommendations = await recommendationRepository.FindByIdsAsync(createInput.RecommendationIds);

        var entity = new Illness
        {
            Name = createInput.Name,
            Recommendations = recommendations
        };

        return entity;
    }

    protected override async Task MapToEntityAsync(CreateUpdateIllnessDto updateInput, Illness entity)
    {
        entity.Name = updateInput.Name;
        entity.Recommendations = await recommendationRepository.FindByIdsAsync(updateInput.RecommendationIds);
    }
}