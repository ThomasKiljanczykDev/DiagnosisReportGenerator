using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;

public class DiagnosisDto : EntityDto<Guid>
{
    [Required]
    public required string Name { get; init; }

    [Required]
    public required Guid[] RecommendationIds { get; init; }
}