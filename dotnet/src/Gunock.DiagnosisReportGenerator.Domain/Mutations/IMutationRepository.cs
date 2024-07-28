using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.Mutations;

public interface IMutationRepository : IRepository<Mutation, Guid>
{
    Task<List<Mutation>> FindByIdsAsync(ICollection<Guid> ids);
}