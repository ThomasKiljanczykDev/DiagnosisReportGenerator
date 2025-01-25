using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public interface ITestMethodAppService : ICrudAppService<TestMethodDto, Guid, PagedAndSortedResultRequestDto,
    CreateUpdateTestMethodDto>;