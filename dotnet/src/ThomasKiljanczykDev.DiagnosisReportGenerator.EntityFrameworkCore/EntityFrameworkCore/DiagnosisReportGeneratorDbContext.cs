using System.Reflection;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Diagnoses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Illnesses;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Mutations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Recommendations;
using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;

[ConnectionStringName("Default")]
public class DiagnosisReportGeneratorDbContext(
    DbContextOptions<DiagnosisReportGeneratorDbContext> options
) : AbpDbContext<DiagnosisReportGeneratorDbContext>(options)
{
    public DbSet<Diagnosis> Diagnoses { get; set; }

    public DbSet<Gene> Genes { get; set; }

    public DbSet<Illness> Illnesses { get; set; }

    public DbSet<Mutation> Mutations { get; set; }

    public DbSet<Recommendation> Recommendations { get; set; }

    public DbSet<TestMethod> TestMethods { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}