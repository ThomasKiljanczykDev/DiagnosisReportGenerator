using Gunock.DiagnosisReportGenerator.TestBase;
using Volo.Abp.Modularity;

namespace Gunock.DiagnosisReportGenerator.Domain.Tests;

[DependsOn(typeof(DiagnosisReportGeneratorDomainModule), typeof(DiagnosisReportGeneratorTestBaseModule))]
public class DiagnosisReportGeneratorDomainTestModule : AbpModule;