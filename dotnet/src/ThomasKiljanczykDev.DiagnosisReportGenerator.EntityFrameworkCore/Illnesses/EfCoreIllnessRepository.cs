using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Illnesses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.Illnesses;

public class EfCoreIllnessRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, Illness, Guid>(dbContextProvider), IIllnessRepository;