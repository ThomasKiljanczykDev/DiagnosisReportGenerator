using Gunock.DiagnosisReportGenerator.Application.Contracts;
using Volo.Abp.Modularity;

namespace Gunock.DiagnosisReportGenerator.HttpApi;

[DependsOn(typeof(DiagnosisReportGeneratorApplicationContractsModule))]
public class DiagnosisReportGeneratorHttpApiModule : AbpModule;