using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Diagnoses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class DiagnosisTypeConfiguration : IEntityTypeConfiguration<Diagnosis>
{
    public void Configure(EntityTypeBuilder<Diagnosis> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedNever();

        builder.Property(e => e.Name).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}