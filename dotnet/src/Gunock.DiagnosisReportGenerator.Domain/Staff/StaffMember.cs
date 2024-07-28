using Gunock.DiagnosisReportGenerator.Domain.Shared.Staff;
using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Staff;

public class StaffMember(
    Guid id
) : Entity<Guid>(id)
{
    public required string Name { get; set; }

    public required string Title { get; set; }

    public required StaffRole Role { get; set; }
}