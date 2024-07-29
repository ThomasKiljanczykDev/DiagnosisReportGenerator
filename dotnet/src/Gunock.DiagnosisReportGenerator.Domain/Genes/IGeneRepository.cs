using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.Genes;

public interface IGeneRepository : IRepository<Gene, Guid>;