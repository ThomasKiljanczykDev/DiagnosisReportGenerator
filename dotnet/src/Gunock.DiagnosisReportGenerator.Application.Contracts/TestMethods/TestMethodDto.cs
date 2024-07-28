using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;

public class TestMethodDto : EntityDto<Guid>
{
    public required string Name { get; init; }
}