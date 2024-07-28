using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;

public interface IRecommendationAppService : ICrudAppService<RecommendationDto, Guid, PagedAndSortedResultRequestDto,
    CreateUpdateRecommendationDto>;