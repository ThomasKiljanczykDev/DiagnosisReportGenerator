using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public class TestMethodDto : EntityDto<Guid>
{
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }
}