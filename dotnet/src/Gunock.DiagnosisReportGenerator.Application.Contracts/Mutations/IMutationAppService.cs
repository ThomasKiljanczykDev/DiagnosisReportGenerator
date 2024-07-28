using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;

public interface
    IMutationAppService : ICrudAppService<MutationDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateMutationDto>;