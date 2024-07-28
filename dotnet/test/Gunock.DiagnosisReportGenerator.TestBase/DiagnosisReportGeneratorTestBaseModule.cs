using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Autofac;
using Volo.Abp.Data;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;

namespace Gunock.DiagnosisReportGenerator.TestBase;

[DependsOn(typeof(AbpAutofacModule), typeof(AbpTestBaseModule))]
public class DiagnosisReportGeneratorTestBaseModule : AbpModule
{
    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        SeedTestData(context);
    }

    private static void SeedTestData(ApplicationInitializationContext context)
    {
        AsyncHelper.RunSync(
            async () =>
            {
                using var scope = context.ServiceProvider.CreateScope();
                await scope.ServiceProvider.GetRequiredService<IDataSeeder>().SeedAsync();
            }
        );
    }
}