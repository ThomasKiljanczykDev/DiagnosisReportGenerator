using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared;
using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain;

[DependsOn(typeof(AbpDddDomainModule), typeof(DiagnosisReportGeneratorDomainSharedModule))]
public class DiagnosisReportGeneratorDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
    }
}