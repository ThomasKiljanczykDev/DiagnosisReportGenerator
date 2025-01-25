using System.Text.Json.Serialization;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore;
using ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using ThomasKiljanczykDev.DiagnosisReportGenerator.HttpApi;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NLog.Web;
using ThomasKiljanczykDev.DiagnosisReportGenerator.HttpApi.Host.Swagger;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;
using Volo.Abp.Swashbuckle;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.HttpApi.Host;

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
    private const string SwaggerName = "DiagnosisReportGenerator API";

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureLogging(context);
        ConfigureHostServices(context);
        ConfigureConventionalControllers();
        ConfigureCors(context);
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

    private static void ConfigureHostServices(ServiceConfigurationContext context)
    {
        context.Services
            .AddControllers()
            .AddJsonOptions(
                options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); }
            );

        context.Services.AddResponseCompression();
        context.Services.AddRequestDecompression();
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

    private static void ConfigureCors(ServiceConfigurationContext context)
    {
        context.Services.AddCors(
            options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithAbpExposedHeaders()
                            .SetIsOriginAllowedToAllowWildcardSubdomains();
                    }
                );
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
                        Title = SwaggerName,
                        Version = "v1"
                    }
                );
                options.DocInclusionPredicate((_, _) => true);
                options.CustomOperationIds(x => x.ActionDescriptor.RouteValues["action"]);
                options.SupportNonNullableReferenceTypes();
                options.UserFriendlyEnums();

                options.SchemaFilter<RequireNonNullablePropertiesSchemaFilter>();
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

        app.UseStaticFiles();
        app.UseRouting();

        app.UseUnitOfWork();
        app.UseRequestDecompression();
        app.UseResponseCompression();

        app.UseCors();

        app.UseSwagger();
        app.UseAbpSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", SwaggerName); });

        app.UseConfiguredEndpoints();
    }
}