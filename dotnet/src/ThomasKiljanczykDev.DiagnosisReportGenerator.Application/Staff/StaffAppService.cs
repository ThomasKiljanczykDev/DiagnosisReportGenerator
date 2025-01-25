using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Staff;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Staff;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Staff;

public class StaffAppService(
    IStaffRepository staffRepository
) : CrudAppService<StaffMember, StaffMemberDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateStaffMemberDto>(
        staffRepository
    ),
    IStaffAppService;