using Gunock.DiagnosisReportGenerator.Domain.Tests;
using Volo.Abp.Modularity;

namespace Gunock.DiagnosisReportGenerator.Application.Tests;

[DependsOn(typeof(DiagnosisReportGeneratorApplicationModule), typeof(DiagnosisReportGeneratorDomainTestModule))]
public class DiagnosisReportGeneratorApplicationTestModule : AbpModule
{
}