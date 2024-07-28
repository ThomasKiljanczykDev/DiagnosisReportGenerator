using System.ComponentModel.DataAnnotations;
using Gunock.DiagnosisReportGenerator.Domain.Shared.Staff;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;

public class StaffMemberDto : EntityDto<Guid>
{
    [StringLength(128, MinimumLength = 1)]
    public required string Name { get; init; }

    [StringLength(128, MinimumLength = 1)]
    public required string Title { get; init; }
    
    public required StaffRole Role { get; init; }
}