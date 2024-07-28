using Gunock.DiagnosisReportGenerator.Domain.Shared.Staff;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;

public class StaffMemberDto : EntityDto<Guid>
{
    public required string Name { get; init; }

    public required string Title { get; init; }

    public required StaffRole Role { get; init; }
}