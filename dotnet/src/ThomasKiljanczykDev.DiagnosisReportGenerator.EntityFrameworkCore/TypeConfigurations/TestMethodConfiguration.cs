using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.TestMethods;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class TestMethodMemberTypeConfiguration : IEntityTypeConfiguration<TestMethod>
{
    public void Configure(EntityTypeBuilder<TestMethod> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedNever();

        builder.Property(e => e.Name).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}