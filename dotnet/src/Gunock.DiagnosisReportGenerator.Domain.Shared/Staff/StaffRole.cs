using System.Diagnostics.CodeAnalysis;

namespace Gunock.DiagnosisReportGenerator.Domain.Shared.Staff;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
public enum StaffRole
{
    Doctor,
    Technician,
    Consultant,
    Assistant
}