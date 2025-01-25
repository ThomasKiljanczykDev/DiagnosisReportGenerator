using Volo.Abp.Domain.Repositories;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Diagnoses;

public interface IDiagnosisRepository : IRepository<Diagnosis, Guid>;