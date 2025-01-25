using System.Diagnostics.CodeAnalysis;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Staff;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
public enum StaffRole
{
    Doctor,
    Technician,
    Consultant,
    Assistant
}