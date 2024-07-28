using Volo.Abp.Domain.Entities;

namespace Gunock.DiagnosisReportGenerator.Domain.Mutations;

public class Mutation(
    Guid id
) : Entity<Guid>(id)
{
    public required string Name { get; set; }
}