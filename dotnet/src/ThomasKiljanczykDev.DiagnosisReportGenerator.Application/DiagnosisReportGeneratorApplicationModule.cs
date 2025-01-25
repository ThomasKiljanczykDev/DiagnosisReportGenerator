using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain;
using Volo.Abp.Application;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application;

[DependsOn(
    typeof(AbpAutoMapperModule),
    typeof(AbpDddApplicationModule),
    typeof(DiagnosisReportGeneratorDomainModule),
    typeof(DiagnosisReportGeneratorApplicationContractsModule)
)]
public class DiagnosisReportGeneratorApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options => { options.AddMaps<DiagnosisReportGeneratorApplicationModule>(); });
    }
}