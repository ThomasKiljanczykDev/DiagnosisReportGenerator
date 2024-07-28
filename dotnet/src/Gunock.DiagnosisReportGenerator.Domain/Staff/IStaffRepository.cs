using Volo.Abp.Domain.Repositories;

namespace Gunock.DiagnosisReportGenerator.Domain.Staff;

public interface IStaffRepository : IRepository<StaffMember, Guid>;