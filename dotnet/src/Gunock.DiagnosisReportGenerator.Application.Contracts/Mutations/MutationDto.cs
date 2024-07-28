using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;

public class MutationDto : EntityDto<Guid>
{
    [Required]
    public required string Name { get; init; }
}