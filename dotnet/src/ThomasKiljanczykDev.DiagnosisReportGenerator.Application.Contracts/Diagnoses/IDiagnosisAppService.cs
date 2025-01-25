using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Diagnoses;

public interface IDiagnosisAppService : ICrudAppService<DiagnosisDto, Guid, PagedAndSortedResultRequestDto,
    CreateUpdateDiagnosisDto>;