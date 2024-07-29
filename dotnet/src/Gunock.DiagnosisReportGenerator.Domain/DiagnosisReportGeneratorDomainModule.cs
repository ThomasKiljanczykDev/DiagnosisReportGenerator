using Gunock.DiagnosisReportGenerator.Domain.Shared;
using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace Gunock.DiagnosisReportGenerator.Domain;

[DependsOn(typeof(AbpDddDomainModule), typeof(DiagnosisReportGeneratorDomainSharedModule))]
public class DiagnosisReportGeneratorDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
    }
}