using Gunock.DiagnosisReportGenerator.TestBase;
using Volo.Abp.Modularity;

namespace Gunock.DiagnosisReportGenerator.Application.Tests;

public abstract class
    DiagnosisReportGeneratorApplicationTestBase<TStartupModule> : DiagnosisReportGeneratorTestBase<TStartupModule>
    where TStartupModule : IAbpModule;