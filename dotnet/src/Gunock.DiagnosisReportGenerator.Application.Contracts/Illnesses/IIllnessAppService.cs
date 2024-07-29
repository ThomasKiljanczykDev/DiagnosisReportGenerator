using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Illnesses;

public interface
    IIllnessAppService : ICrudAppService<IllnessDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateIllnessDto>;