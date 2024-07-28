using System.ComponentModel.DataAnnotations;
using Gunock.DiagnosisReportGenerator.Domain.Shared.Staff;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;

public class CreateUpdateStaffMemberDto
{
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }

    [StringLength(128, MinimumLength = 1)]
    public required string Title { get; init; }

    public required StaffRole Role { get; init; }
}