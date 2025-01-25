using Volo.Abp.Domain.Repositories;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Staff;

public interface IStaffRepository : IRepository<StaffMember, Guid>;