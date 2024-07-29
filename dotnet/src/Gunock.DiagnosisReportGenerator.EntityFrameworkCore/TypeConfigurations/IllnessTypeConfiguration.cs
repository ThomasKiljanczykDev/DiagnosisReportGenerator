using Gunock.DiagnosisReportGenerator.Domain.Illnesses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class IllnessTypeConfiguration : IEntityTypeConfiguration<Illness>
{
    public void Configure(EntityTypeBuilder<Illness> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedNever();

        builder.Property(e => e.Name).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}