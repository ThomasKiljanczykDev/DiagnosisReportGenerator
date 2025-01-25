using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared;

[DependsOn(typeof(AbpDddDomainSharedModule))]
public class DiagnosisReportGeneratorDomainSharedModule : AbpModule;