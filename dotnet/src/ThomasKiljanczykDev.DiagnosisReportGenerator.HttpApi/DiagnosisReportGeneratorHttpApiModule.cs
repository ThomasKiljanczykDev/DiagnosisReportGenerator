using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.HttpApi;

[DependsOn(typeof(DiagnosisReportGeneratorApplicationContractsModule))]
public class DiagnosisReportGeneratorHttpApiModule : AbpModule;