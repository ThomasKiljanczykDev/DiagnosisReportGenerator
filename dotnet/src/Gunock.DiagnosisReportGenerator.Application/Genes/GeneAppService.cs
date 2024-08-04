using Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;
using Gunock.DiagnosisReportGenerator.Domain.Genes;
using Gunock.DiagnosisReportGenerator.Domain.Mutations;
using Gunock.DiagnosisReportGenerator.Domain.TestMethods;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Genes;

public class GeneAppService(
    IGeneRepository geneRepository,
    ITestMethodRepository testMethodRepository,
    IMutationRepository mutationRepository
) : CrudAppService<Gene, GeneDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateGeneDto>(geneRepository),
    IGeneAppService
{
    protected override async Task<Gene> MapToEntityAsync(CreateUpdateGeneDto createInput)
    {
        var testMethods = await testMethodRepository.FindByIdsAsync(createInput.TestMethodIds);
        var mutations = await mutationRepository.FindByIdsAsync(createInput.MutationIds);

        var entity = new Gene
        {
            Name = createInput.Name,
            TestMethods = testMethods,
            Mutations = mutations
        };

        return entity;
    }

    protected override async Task MapToEntityAsync(CreateUpdateGeneDto updateInput, Gene entity)
    {
        entity.Name = updateInput.Name;
        entity.TestMethods = await testMethodRepository.FindByIdsAsync(updateInput.TestMethodIds);
        entity.Mutations = await mutationRepository.FindByIdsAsync(updateInput.MutationIds);
    }
}