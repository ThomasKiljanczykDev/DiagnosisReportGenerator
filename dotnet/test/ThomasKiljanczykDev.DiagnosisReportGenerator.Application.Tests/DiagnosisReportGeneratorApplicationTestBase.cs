using ThomasKiljanczykDev.DiagnosisReportGenerator.TestBase;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Tests;

public abstract class
    DiagnosisReportGeneratorApplicationTestBase<TStartupModule> : DiagnosisReportGeneratorTestBase<TStartupModule>
    where TStartupModule : IAbpModule;