using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Mutations;

public class Mutation : Entity<Guid>
{
    public required string Name { get; set; }
}