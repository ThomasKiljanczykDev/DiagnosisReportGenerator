using Gunock.DiagnosisReportGenerator.Domain.Recommendations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class RecommendationTypeConfiguration : IEntityTypeConfiguration<Recommendation>
{
    public void Configure(EntityTypeBuilder<Recommendation> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedOnAdd();

        builder.Property(e => e.Name).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}