using System;
using System.Threading.Tasks;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;
using Shouldly;
using Volo.Abp.Modularity;
using Xunit;

namespace Gunock.DiagnosisReportGenerator.Application.Tests.Samples;

/* This is just an example test class.
 * Normally, you don't test code of the modules you are using
 * (like IIdentityUserAppService here).
 * Only test your own application services.
 */
public abstract class
    SampleAppServiceTests<TStartupModule> : DiagnosisReportGeneratorApplicationTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{
    private readonly IDiagnosisAppService _diagnosisAppService;

    protected SampleAppServiceTests()
    {
        _diagnosisAppService = GetRequiredService<IDiagnosisAppService>();
    }

    [Fact]
    public async Task Should_Create_A_Diagnosis()
    {
        // Arrange
        var input = new CreateUpdateDiagnosisDto
        {
            Name = "Test Diagnosis",
            RecommendationIds = []
        };

        // Act
        var newDiagnosis = await _diagnosisAppService.CreateAsync(input);

        // Assert
        newDiagnosis.Id.ShouldNotBe(Guid.Empty);
        newDiagnosis.Name.ShouldBe(input.Name);
    }
}