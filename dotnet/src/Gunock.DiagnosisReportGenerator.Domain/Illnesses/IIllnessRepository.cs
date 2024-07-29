using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.Illnesses;

public interface IIllnessRepository : IRepository<Illness, Guid>;