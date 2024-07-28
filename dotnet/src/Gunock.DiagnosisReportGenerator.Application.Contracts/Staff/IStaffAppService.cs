using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;

public interface IStaffAppService : ICrudAppService<StaffMemberDto, Guid, PagedAndSortedResultRequestDto,
    CreateUpdateStaffMemberDto>;