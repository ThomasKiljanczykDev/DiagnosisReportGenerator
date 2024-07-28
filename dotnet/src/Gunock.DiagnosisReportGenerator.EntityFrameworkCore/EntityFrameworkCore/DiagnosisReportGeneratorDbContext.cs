using System.Reflection;
using Gunock.DiagnosisReportGenerator.Domain.Diagnoses;
using Gunock.DiagnosisReportGenerator.Domain.Genes;
using Gunock.DiagnosisReportGenerator.Domain.Illnesses;
using Gunock.DiagnosisReportGenerator.Domain.Mutations;
using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Gunock.DiagnosisReportGenerator.Domain.TestMethods;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;

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