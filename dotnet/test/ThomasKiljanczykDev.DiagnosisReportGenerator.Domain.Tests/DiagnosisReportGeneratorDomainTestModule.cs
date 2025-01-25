using ThomasKiljanczykDev.DiagnosisReportGenerator.TestBase;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Tests;

[DependsOn(typeof(DiagnosisReportGeneratorDomainModule), typeof(DiagnosisReportGeneratorTestBaseModule))]
public class DiagnosisReportGeneratorDomainTestModule : AbpModule;