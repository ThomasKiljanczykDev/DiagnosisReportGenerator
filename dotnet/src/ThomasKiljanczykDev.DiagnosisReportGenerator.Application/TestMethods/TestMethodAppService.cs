using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.TestMethods;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.TestMethods;

public class TestMethodAppService(
    ITestMethodRepository testMethodRepository
) : CrudAppService<TestMethod, TestMethodDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateTestMethodDto>(
        testMethodRepository
    ),
    ITestMethodAppService;