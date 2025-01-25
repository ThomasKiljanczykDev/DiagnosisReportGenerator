using ThomasKiljanczykDev.DiagnosisReportGenerator.Domain.Staff;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ThomasKiljanczykDev.DiagnosisReportGenerator.EntityFrameworkCore.TypeConfigurations;

public class StaffMemberTypeConfiguration : IEntityTypeConfiguration<StaffMember>
{
    public void Configure(EntityTypeBuilder<StaffMember> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedNever();

        builder.Property(e => e.Name).HasMaxLength(128);
        builder.Property(e => e.Title).HasMaxLength(128);

        builder.HasIndex(e => e.Name).IsUnique();
    }
}