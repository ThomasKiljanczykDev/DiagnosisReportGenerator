using Gunock.DiagnosisReportGenerator.Domain.TestMethods;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.TestMethods;

public class EfCoreTestMethodRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, TestMethod, Guid>(dbContextProvider), ITestMethodRepository
{
    public async Task<List<TestMethod>> FindByIdsAsync(IEnumerable<Guid> ids)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet.Where(testMethod => ids.Contains(testMethod.Id)).ToListAsync();
    }
}