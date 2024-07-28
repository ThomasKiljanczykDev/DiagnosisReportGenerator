using Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;
using Gunock.DiagnosisReportGenerator.Domain.TestMethods;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.TestMethods;

public class TestMethodAppService(
    ITestMethodRepository testMethodRepository
) : CrudAppService<TestMethod, TestMethodDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateTestMethodDto>(
        testMethodRepository
    ),
    ITestMethodAppService;