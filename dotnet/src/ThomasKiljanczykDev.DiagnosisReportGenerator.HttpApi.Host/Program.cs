namespace ThomasKiljanczykDev.DiagnosisReportGenerator.HttpApi.Host;

public class Program
{
    public static async Task<int> Main(string[] args)
    {
        ILogger<Program>? logger = null;
        try
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Host.AddAppSettingsSecretsJson().UseAutofac();

            await builder.AddApplicationAsync<DiagnosisReportGeneratorHttpApiHostModule>();
            var app = builder.Build();
            await app.InitializeApplicationAsync();

            logger = app.Services.GetService<ILogger<Program>>();

            await app.RunAsync();
            return 0;
        }
        catch (Exception ex)
        {
            if (ex is HostAbortedException)
            {
                throw;
            }

            logger?.LogCritical(ex, "Host terminated unexpectedly!");
            return 1;
        }
    }
}