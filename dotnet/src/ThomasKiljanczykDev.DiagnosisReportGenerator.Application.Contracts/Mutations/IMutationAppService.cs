using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Mutations;

public interface
    IMutationAppService : ICrudAppService<MutationDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateMutationDto>;