using Gunock.DiagnosisReportGenerator.Domain.Illnesses;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.Illnesses;

public class EfCoreIllnessRepository(
    IDbContextProvider<DiagnosisReportGeneratorDbContext> dbContextProvider
) : EfCoreRepository<DiagnosisReportGeneratorDbContext, Illness, Guid>(dbContextProvider), IIllnessRepository;