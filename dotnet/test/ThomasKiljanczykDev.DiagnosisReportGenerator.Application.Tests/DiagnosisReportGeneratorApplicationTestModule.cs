using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Tests;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Tests;

[DependsOn(typeof(DiagnosisReportGeneratorApplicationModule), typeof(DiagnosisReportGeneratorDomainTestModule))]
public class DiagnosisReportGeneratorApplicationTestModule : AbpModule;