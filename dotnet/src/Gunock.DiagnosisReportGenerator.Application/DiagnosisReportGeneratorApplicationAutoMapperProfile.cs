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

        CreateMap<Gene, GeneDto>()
            .ForMember(dest => dest.TestMethodIds, opt => opt.MapFrom(src => src.TestMethods.Select(x => x.Id)))
            .ForMember(dest => dest.MutationIds, opt => opt.MapFrom(src => src.Mutations.Select(x => x.Id)));

        CreateMap<Illness, IllnessDto>()
            .ForMember(
                dest => dest.RecommendationIds,
                opt => opt.MapFrom(src => src.Recommendations.Select(x => x.Id))
            );

        CreateMap<Mutation, MutationDto>();
        CreateMap<CreateUpdateMutationDto, Mutation>();

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
        CreateMap<CreateUpdateRecommendationDto, Recommendation>()
            .ForMember(dest => dest.AgeFrom, opt => opt.MapFrom(src => src.AgeRange.From))
            .ForMember(dest => dest.AgeTo, opt => opt.MapFrom(src => src.AgeRange.To));

        CreateMap<StaffMember, StaffMemberDto>();
        CreateMap<CreateUpdateStaffMemberDto, StaffMember>();

        CreateMap<TestMethod, TestMethodDto>();
        CreateMap<CreateUpdateTestMethodDto, TestMethod>();
    }
}