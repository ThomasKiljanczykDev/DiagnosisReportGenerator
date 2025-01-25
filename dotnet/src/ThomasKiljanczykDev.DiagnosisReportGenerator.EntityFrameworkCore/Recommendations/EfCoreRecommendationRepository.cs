using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;
using Microsoft.EntityFrameworkCore;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.Recommendations;

public class EfCoreRecommendationRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, Recommendation, Guid>(dbContextProvider),
    IRecommendationRepository
{
    public async Task<List<Recommendation>> FindByIdsAsync(ICollection<Guid> ids)
    {
        if (ids.Count == 0)
        {
            return [];
        }

        var dbSet = await GetDbSetAsync();
        return await dbSet.Where(recommendation => ids.Contains(recommendation.Id)).ToListAsync();
    }
}