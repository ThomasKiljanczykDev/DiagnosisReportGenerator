using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Recommendations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Recommendations;

public class RecommendationAppService(
    IRecommendationRepository recommendationRepository
) : CrudAppService<Recommendation, RecommendationDto, Guid, PagedAndSortedResultRequestDto,
        CreateUpdateRecommendationDto>(recommendationRepository),
    IRecommendationAppService
{
    public override async Task<RecommendationDto> CreateAsync(CreateUpdateRecommendationDto input)
    {
        var newEntityDto = await base.CreateAsync(input);

        var allEntities = await Repository.GetListAsync();
        var sortedEntities = allEntities.OrderBy(x => x.Priority).ToList();

        var priority = 1;
        foreach (var entity in sortedEntities)
        {
            entity.Priority = priority;
            priority++;
        }

        await Repository.UpdateManyAsync(sortedEntities, autoSave: true);

        var newEntity = await Repository.GetAsync(newEntityDto.Id);
        return await MapToGetOutputDtoAsync(newEntity);
    }

    public override async Task<RecommendationDto> UpdateAsync(Guid id, CreateUpdateRecommendationDto input)
    {
        var oldEntity = await Repository.GetAsync(id);

        var query = await Repository.GetQueryableAsync();
        query = query.Where(x => x.Priority == input.Priority);
        var entityWithSamePriority = await AsyncExecuter.FirstOrDefaultAsync(query);

        // Swap priorities
        if (entityWithSamePriority != null)
        {
            entityWithSamePriority.Priority = oldEntity.Priority;
            await Repository.UpdateAsync(entityWithSamePriority, autoSave: true);
        }

        return await base.UpdateAsync(id, input);
    }

    public override async Task<PagedResultDto<RecommendationDto>> GetListAsync(PagedAndSortedResultRequestDto input)
    {
        if (input.Sorting.IsNullOrWhiteSpace())
        {
            input.Sorting = nameof(Recommendation.Priority);
        }

        return await base.GetListAsync(input);
    }
}