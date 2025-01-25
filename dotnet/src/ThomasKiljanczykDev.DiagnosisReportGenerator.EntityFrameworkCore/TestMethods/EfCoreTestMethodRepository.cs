using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;
using Microsoft.EntityFrameworkCore;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.TestMethods;

public class EfCoreTestMethodRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, TestMethod, Guid>(dbContextProvider), ITestMethodRepository
{
    public async Task<List<TestMethod>> FindByIdsAsync(ICollection<Guid> ids)
    {
        if (ids.Count == 0)
        {
            return [];
        }

        var dbSet = await GetDbSetAsync();
        return await dbSet.Where(testMethod => ids.Contains(testMethod.Id)).ToListAsync();
    }
}