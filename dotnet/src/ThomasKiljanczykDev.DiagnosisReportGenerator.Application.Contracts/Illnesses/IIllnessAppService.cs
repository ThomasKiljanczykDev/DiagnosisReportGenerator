using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Illnesses;

public interface
    IIllnessAppService : ICrudAppService<IllnessDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateIllnessDto>;