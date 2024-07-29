using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public interface ITestMethodAppService : ICrudAppService<TestMethodDto, Guid, PagedAndSortedResultRequestDto,
    CreateUpdateTestMethodDto>;