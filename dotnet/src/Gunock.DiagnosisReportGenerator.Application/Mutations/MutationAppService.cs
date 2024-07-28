using Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;
using Gunock.DiagnosisReportGenerator.Domain.Mutations;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Mutations;

public class MutationAppService(
    IMutationRepository mutationRepository
) : CrudAppService<Mutation, MutationDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateMutationDto>(
        mutationRepository
    ),
    IMutationAppService;