using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.TestMethods;

public interface ITestMethodRepository : IRepository<TestMethod, Guid>
{
    Task<List<TestMethod>> FindByIdsAsync(ICollection<Guid> ids);
}