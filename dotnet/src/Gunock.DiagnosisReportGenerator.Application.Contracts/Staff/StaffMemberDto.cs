using System.ComponentModel.DataAnnotations;
using Gunock.DiagnosisReportGenerator.Domain.Shared.Staff;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;

public class StaffMemberDto : EntityDto<Guid>
{
    [Required]
    public required string Name { get; init; }

    [Required]
    public required string Title { get; init; }

    [Required]
    public required StaffRole Role { get; init; }
}