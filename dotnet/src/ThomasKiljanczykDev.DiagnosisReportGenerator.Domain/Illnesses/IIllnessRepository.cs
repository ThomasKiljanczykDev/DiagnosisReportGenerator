using Volo.Abp.Domain.Repositories;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Illnesses;

public interface IIllnessRepository : IRepository<Illness, Guid>;