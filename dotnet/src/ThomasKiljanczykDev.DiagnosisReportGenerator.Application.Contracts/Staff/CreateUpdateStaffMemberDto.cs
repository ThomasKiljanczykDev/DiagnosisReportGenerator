using System.ComponentModel.DataAnnotations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Staff;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Staff;

public class CreateUpdateStaffMemberDto
{
    [Required]
    [StringLength(128)]
    public required string Name { get; init; }

    [Required]
    [StringLength(128)]
    public required string Title { get; init; }

    [Required]
    public required StaffRole Role { get; init; }
}