using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public class TestMethodDto : EntityDto<Guid>
{
    [Required]
    public required string Name { get; init; }
}