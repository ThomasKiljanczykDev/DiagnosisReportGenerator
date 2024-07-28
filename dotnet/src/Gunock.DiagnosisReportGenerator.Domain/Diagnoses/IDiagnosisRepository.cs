using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.Diagnoses;

public interface IDiagnosisRepository : IRepository<Diagnosis, Guid>;