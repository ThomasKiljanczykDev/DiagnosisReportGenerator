﻿using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Sqlite;
using Volo.Abp.Modularity;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore;

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
                options.PreConfigure<DiagnosisReportGeneratorDbContext>(
                    configurationContext => { configurationContext.DbContextOptions.UseLazyLoadingProxies(); }
                );
                options.UseSqlite(
                    sqliteOptions => { sqliteOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery); }
                );
            }
        );
    }
}