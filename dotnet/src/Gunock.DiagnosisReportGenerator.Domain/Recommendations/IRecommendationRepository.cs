using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.Recommendations;

public interface IRecommendationRepository : IRepository<Recommendation, Guid>
{
    Task<List<Recommendation>> FindByIdsAsync(IEnumerable<Guid> ids);
}