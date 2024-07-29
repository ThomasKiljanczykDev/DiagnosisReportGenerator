using System.ComponentModel.DataAnnotations;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public class CreateUpdateTestMethodDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }
}