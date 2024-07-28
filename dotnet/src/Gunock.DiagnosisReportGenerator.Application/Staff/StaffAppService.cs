using Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;
using Gunock.DiagnosisReportGenerator.Domain.Staff;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Staff;

public class StaffAppService(
    IStaffRepository staffRepository
) : CrudAppService<StaffMember, StaffMemberDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateStaffMemberDto>(
        staffRepository
    ),
    IStaffAppService;