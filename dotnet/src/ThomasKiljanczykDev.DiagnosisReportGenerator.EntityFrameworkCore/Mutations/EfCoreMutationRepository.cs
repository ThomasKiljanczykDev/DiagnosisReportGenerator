using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;
using Microsoft.EntityFrameworkCore;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.Mutations;

public class EfCoreMutationRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, Mutation, Guid>(dbContextProvider), IMutationRepository
{
    public async Task<List<Mutation>> FindByIdsAsync(ICollection<Guid> ids)
    {
        if (ids.Count == 0)
        {
            return [];
        }

        var dbSet = await GetDbSetAsync();
        return await dbSet.Where(mutation => ids.Contains(mutation.Id)).ToListAsync();
    }
}