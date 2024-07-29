using Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;
using Gunock.DiagnosisReportGenerator.Domain.Diagnoses;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Diagnoses;

public class DiagnosisAppService(
    IDiagnosisRepository diagnosisRepository
) : CrudAppService<Diagnosis, DiagnosisDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateDiagnosisDto>(
        diagnosisRepository
    ),
    IDiagnosisAppService;