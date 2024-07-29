using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;

public interface IGeneAppService : ICrudAppService<GeneDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateGeneDto>;