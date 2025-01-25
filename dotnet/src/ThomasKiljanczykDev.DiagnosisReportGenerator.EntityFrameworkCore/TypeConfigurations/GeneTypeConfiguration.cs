using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Genes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class GeneTypeConfiguration : IEntityTypeConfiguration<Gene>
{
    public void Configure(EntityTypeBuilder<Gene> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedNever();

        builder.Property(e => e.Name).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}