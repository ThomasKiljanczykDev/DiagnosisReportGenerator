using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;

public interface IDiagnosisAppService : ICrudAppService<DiagnosisDto, Guid, PagedAndSortedResultRequestDto,
    CreateUpdateDiagnosisDto>;