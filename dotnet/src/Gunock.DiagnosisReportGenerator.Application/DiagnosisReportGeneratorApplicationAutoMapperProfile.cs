using AutoMapper;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Diagnoses;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Genes;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Illnesses;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Mutations;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Recommendations;
using Gunock.DiagnosisReportGenerator.Application.Contracts.Staff;
using Gunock.DiagnosisReportGenerator.Application.Contracts.TestMethods;
using Gunock.DiagnosisReportGenerator.Domain.Diagnoses;
using Gunock.DiagnosisReportGenerator.Domain.Genes;
using Gunock.DiagnosisReportGenerator.Domain.Illnesses;
using Gunock.DiagnosisReportGenerator.Domain.Mutations;
using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Gunock.DiagnosisReportGenerator.Domain.Staff;
using Gunock.DiagnosisReportGenerator.Domain.TestMethods;
using Range = Gunock.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace Gunock.DiagnosisReportGenerator.Application;

public class DiagnosisReportGeneratorApplicationAutoMapperProfile : Profile
{
    public DiagnosisReportGeneratorApplicationAutoMapperProfile()
    {
        CreateMap<Diagnosis, DiagnosisDto>();
        CreateMap<CreateUpdateDiagnosisDto, Diagnosis>();

        CreateMap<Gene, GeneDto>();

        CreateMap<Illness, IllnessDto>();

        CreateMap<Mutation, MutationDto>();

        CreateMap<Recommendation, RecommendationDto>()
            .ForMember(
                dest => dest.AgeRange,
                opt => opt.MapFrom(
                    src => new Range
                    {
                        From = src.AgeFrom,
                        To = src.AgeTo
                    }
                )
            );

        CreateMap<StaffMember, StaffMemberDto>();

        CreateMap<TestMethod, TestMethodDto>();
    }
}