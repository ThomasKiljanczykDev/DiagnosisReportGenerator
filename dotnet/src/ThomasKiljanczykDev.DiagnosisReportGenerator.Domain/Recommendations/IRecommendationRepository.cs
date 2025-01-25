using Volo.Abp.Domain.Repositories;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;

public interface IRecommendationRepository : IRepository<Recommendation, Guid>
{
    Task<List<Recommendation>> FindByIdsAsync(ICollection<Guid> ids);
}