using Volo.Abp.Domain.Repositories;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;

public interface IGeneRepository : IRepository<Gene, Guid>;