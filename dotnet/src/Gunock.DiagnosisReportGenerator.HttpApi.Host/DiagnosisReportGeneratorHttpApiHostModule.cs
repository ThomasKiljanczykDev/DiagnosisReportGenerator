using Gunock.DiagnosisReportGenerator.Application;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NLog.Web;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;
using Volo.Abp.Swashbuckle;

namespace Gunock.DiagnosisReportGenerator.HttpApi.Host;

[DependsOn(
    typeof(DiagnosisReportGeneratorHttpApiModule),
    typeof(AbpAutofacModule),
    typeof(AbpAspNetCoreMvcModule),
    typeof(DiagnosisReportGeneratorApplicationModule),
    typeof(DiagnosisReportGeneratorEntityFrameworkCoreModule),
    typeof(AbpSwashbuckleModule)
)]
public class DiagnosisReportGeneratorHttpApiHostModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureLogging(context);
        ConfigureConventionalControllers();
        ConfigureSwaggerServices(context);
    }

    public override async Task OnApplicationInitializationAsync(ApplicationInitializationContext context)
    {
        await base.OnApplicationInitializationAsync(context);

        var dbContext = context.ServiceProvider.GetRequiredService<DiagnosisReportGeneratorDbContext>();
        await dbContext.Database.MigrateAsync();
    }

    private static void ConfigureLogging(ServiceConfigurationContext context)
    {
        context.Services.AddLogging(builder => builder.ClearProviders().AddNLogWeb());
    }

    private void ConfigureConventionalControllers()
    {
        Configure<AbpAspNetCoreMvcOptions>(
            options =>
            {
                options.ConventionalControllers.Create(typeof(DiagnosisReportGeneratorApplicationModule).Assembly);
            }
        );
    }

    private static void ConfigureSwaggerServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpSwaggerGen(
            options =>
            {
                options.SwaggerDoc(
                    "v1",
                    new OpenApiInfo
                    {
                        Title = "DiagnosisReportGenerator API",
                        Version = "v1"
                    }
                );
                options.DocInclusionPredicate((_, _) => true);
                options.CustomOperationIds(x => x.ActionDescriptor.RouteValues["action"]);
                options.HideAbpEndpoints();
                options.UserFriendlyEnums();
            }
        );
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCorrelationId();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();

        app.UseUnitOfWork();

        app.UseSwagger();
        app.UseAbpSwaggerUI(
            options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "DiagnosisReportGenerator API"); }
        );

        app.UseConfiguredEndpoints();
    }
}