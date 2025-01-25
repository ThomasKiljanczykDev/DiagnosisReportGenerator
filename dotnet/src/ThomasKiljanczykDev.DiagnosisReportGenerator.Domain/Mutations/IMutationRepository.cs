using Volo.Abp.Domain.Repositories;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;

public interface IMutationRepository : IRepository<Mutation, Guid>
{
    Task<List<Mutation>> FindByIdsAsync(ICollection<Guid> ids);
}