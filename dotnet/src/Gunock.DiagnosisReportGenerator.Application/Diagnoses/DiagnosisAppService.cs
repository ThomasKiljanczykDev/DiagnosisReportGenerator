using Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;
using Gunock.DiagnosisReportGenerator.Domain.Diagnoses;
using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Diagnoses;

public class DiagnosisAppService(
    IDiagnosisRepository diagnosisRepository,
    IRecommendationRepository recommendationRepository
) : CrudAppService<Diagnosis, DiagnosisDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateDiagnosisDto>(
        diagnosisRepository
    ),
    IDiagnosisAppService
{
    protected override async Task<Diagnosis> MapToEntityAsync(CreateUpdateDiagnosisDto createInput)
    {
        var recommendations = await recommendationRepository.FindByIdsAsync(createInput.RecommendationIds);

        var entity = new Diagnosis
        {
            Name = createInput.Name,
            Recommendations = recommendations
        };

        return entity;
    }

    protected override async Task MapToEntityAsync(CreateUpdateDiagnosisDto updateInput, Diagnosis entity)
    {
        entity.Name = updateInput.Name;
        entity.Recommendations = await recommendationRepository.FindByIdsAsync(updateInput.RecommendationIds);
    }
}