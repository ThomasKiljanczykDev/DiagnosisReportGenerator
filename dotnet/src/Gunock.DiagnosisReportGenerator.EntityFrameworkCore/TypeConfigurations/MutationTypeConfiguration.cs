using Gunock.DiagnosisReportGenerator.Domain.Mutations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class MutationTypeConfiguration : IEntityTypeConfiguration<Mutation>
{
    public void Configure(EntityTypeBuilder<Mutation> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedOnAdd();

        builder.Property(e => e.Name).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}