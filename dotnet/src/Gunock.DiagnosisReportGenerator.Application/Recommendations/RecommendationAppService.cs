using Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;
using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Recommendations;

public class RecommendationAppService(
    IRecommendationRepository recommendationRepository
) : CrudAppService<Recommendation, RecommendationDto, Guid, PagedAndSortedResultRequestDto,
        CreateUpdateRecommendationDto>(recommendationRepository),
    IRecommendationAppService;