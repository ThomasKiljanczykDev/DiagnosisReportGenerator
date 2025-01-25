using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Staff;
using Volo.Abp.Domain.Entities;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Staff;

public class StaffMember : Entity<Guid>
{
    public required string Name { get; set; }

    public required string Title { get; set; }

    public required StaffRole Role { get; set; }
}