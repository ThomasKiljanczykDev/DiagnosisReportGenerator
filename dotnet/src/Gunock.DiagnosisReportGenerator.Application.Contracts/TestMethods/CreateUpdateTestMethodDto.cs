using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public class CreateUpdateTestMethodDto
{
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }
}