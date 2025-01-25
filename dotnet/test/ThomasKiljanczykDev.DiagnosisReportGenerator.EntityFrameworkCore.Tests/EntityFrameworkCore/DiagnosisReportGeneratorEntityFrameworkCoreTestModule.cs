using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Tests;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Sqlite;
using Volo.Abp.Modularity;
using Volo.Abp.Uow;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.Tests.EntityFrameworkCore;

[DependsOn(
    typeof(DiagnosisReportGeneratorApplicationTestModule),
    typeof(DiagnosisReportGeneratorEntityFrameworkCoreModule),
    typeof(AbpEntityFrameworkCoreSqliteModule)
)]
public class DiagnosisReportGeneratorEntityFrameworkCoreTestModule : AbpModule
{
    private SqliteConnection? _sqliteConnection;

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAlwaysDisableUnitOfWorkTransaction();

        ConfigureInMemorySqlite(context.Services);
    }

    private void ConfigureInMemorySqlite(IServiceCollection services)
    {
        _sqliteConnection = CreateDatabaseAndGetConnection();

        services.Configure<AbpDbContextOptions>(
            options =>
            {
                options.PreConfigure<DiagnosisReportGeneratorDbContext>(
                    configurationContext => { configurationContext.DbContextOptions.UseLazyLoadingProxies(); }
                );
                options.Configure(context => { context.DbContextOptions.UseSqlite(_sqliteConnection); });
            }
        );
    }

    public override void OnApplicationShutdown(ApplicationShutdownContext context)
    {
        _sqliteConnection?.Dispose();
    }

    private static SqliteConnection CreateDatabaseAndGetConnection()
    {
        var connection = new AbpUnitTestSqliteConnection("Data Source=:memory:");
        connection.Open();

        var options = new DbContextOptionsBuilder<DiagnosisReportGeneratorDbContext>().UseSqlite(connection).Options;

        using var context = new DiagnosisReportGeneratorDbContext(options);
        context.GetService<IRelationalDatabaseCreator>().CreateTables();

        return connection;
    }
}