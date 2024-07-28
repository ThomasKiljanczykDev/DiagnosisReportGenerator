using Gunock.DiagnosisReportGenerator.Domain;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Sqlite;
using Volo.Abp.Modularity;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore;

[DependsOn(typeof(DiagnosisReportGeneratorDomainModule), typeof(AbpEntityFrameworkCoreSqliteModule))]
public class DiagnosisReportGeneratorEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<DiagnosisReportGeneratorDbContext>(
            options => { options.AddDefaultRepositories(includeAllEntities: true); }
        );

        Configure<AbpDbContextOptions>(
            options =>
            {
                options.UseSqlite(
                    sqliteOptions => { sqliteOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery); }
                );
            }
        );
    }
}