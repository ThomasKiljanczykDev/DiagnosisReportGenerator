using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Mutations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Mutations;

public class MutationAppService(
    IMutationRepository mutationRepository
) : CrudAppService<Mutation, MutationDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateMutationDto>(
        mutationRepository
    ),
    IMutationAppService;