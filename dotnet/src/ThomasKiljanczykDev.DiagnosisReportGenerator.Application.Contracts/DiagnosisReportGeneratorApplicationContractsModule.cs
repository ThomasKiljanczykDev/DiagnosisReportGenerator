using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared;
using Volo.Abp.Application;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts;

[DependsOn(typeof(AbpDddApplicationContractsModule), typeof(DiagnosisReportGeneratorDomainSharedModule))]
public class DiagnosisReportGeneratorApplicationContractsModule : AbpModule;