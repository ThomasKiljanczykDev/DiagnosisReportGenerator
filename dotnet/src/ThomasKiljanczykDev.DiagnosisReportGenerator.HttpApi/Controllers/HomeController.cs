using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.HttpApi.Controllers;

public class HomeController : AbpController
{
    [HttpGet]
    public ActionResult Index()
    {
        return Redirect("~/swagger");
    }

    [HttpGet("shutdown")]
    public ActionResult Shutdown()
    {
        Task.Run(
            async () =>
            {
                await Task.Delay(1000);
                Environment.Exit(0);
            }
        );

        return Content("Shutting down...");
    }
}