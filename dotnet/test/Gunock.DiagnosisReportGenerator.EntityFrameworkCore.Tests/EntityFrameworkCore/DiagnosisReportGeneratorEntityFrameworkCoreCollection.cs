using Gunock.DiagnosisReportGenerator.TestBase;
using Xunit;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.Tests.EntityFrameworkCore;

[CollectionDefinition(DiagnosisReportGeneratorTestConsts.CollectionDefinitionName)]
public class
    DiagnosisReportGeneratorEntityFrameworkCoreCollection : ICollectionFixture<
    DiagnosisReportGeneratorEntityFrameworkCoreFixture>
{
}