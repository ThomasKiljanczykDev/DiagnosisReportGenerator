using AutoMapper;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Diagnoses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Genes;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Illnesses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Mutations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Recommendations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.Staff;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Application.Contracts.TestMethods;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Diagnoses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Illnesses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Staff;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;
using Range = ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Shared.Recommendations.Range;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.Application;

public class DiagnosisReportGeneratorApplicationAutoMapperProfile : Profile
{
    public DiagnosisReportGeneratorApplicationAutoMapperProfile()
    {
        CreateMap<Diagnosis, DiagnosisDto>()            .ForMember(
            dest => dest.RecommendationIds,
            opt => opt.MapFrom(src => src.Recommendations.Select(x => x.Id))
        );

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