using System;
using System.Threading.Tasks;
using Gunock.DiagnosisReportGenerator.Domain.Diagnoses;
using Gunock.DiagnosisReportGenerator.TestBase;
using Shouldly;
using Xunit;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.Tests.EntityFrameworkCore.Samples;

/* This is just an example test class.
 * Normally, you don't test ABP framework code
 * (like default AppUser repository IRepository<AppUser, Guid> here).
 * Only test your custom repository methods.
 */
[Collection(DiagnosisReportGeneratorTestConsts.CollectionDefinitionName)]
public sealed class SampleRepositoryTests : DiagnosisReportGeneratorEntityFrameworkCoreTestBase
{
    private readonly IDiagnosisRepository _diagnosisRepository;

    public SampleRepositoryTests()
    {
        _diagnosisRepository = GetRequiredService<IDiagnosisRepository>();
    }

    [Fact]
    public async Task Should_Create_A_Diagnosis()
    {
        // Arrange
        var diagnosis = new Diagnosis { Name = "Test Diagnosis" };

        // Act
        var newDiagnosis = await _diagnosisRepository.InsertAsync(diagnosis);

        // Assert
        newDiagnosis.Id.ShouldNotBe(Guid.Empty);
        newDiagnosis.Name.ShouldBe(diagnosis.Name);
    }
}