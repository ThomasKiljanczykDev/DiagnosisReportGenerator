using Gunock.DiagnosisReportGenerator.Domain.Mutations;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.Mutations;

public class EfCoreMutationRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, Mutation, Guid>(dbContextProvider), IMutationRepository
{
    public async Task<List<Mutation>> FindByIdsAsync(IEnumerable<Guid> ids)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet.Where(mutation => ids.Contains(mutation.Id)).ToListAsync();
    }
}