using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.Entities
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Diagnoses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnoses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Illnesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Illnesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mutations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mutations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recommendations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    Level = table.Column<int>(type: "INTEGER", nullable: false),
                    Priority = table.Column<int>(type: "INTEGER", nullable: false),
                    AgeFrom = table.Column<int>(type: "INTEGER", nullable: true),
                    AgeTo = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recommendations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StaffMember",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffMember", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestMethods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestMethods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GeneMutation",
                columns: table => new
                {
                    GenesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MutationsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneMutation", x => new { x.GenesId, x.MutationsId });
                    table.ForeignKey(
                        name: "FK_GeneMutation_Genes_GenesId",
                        column: x => x.GenesId,
                        principalTable: "Genes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GeneMutation_Mutations_MutationsId",
                        column: x => x.MutationsId,
                        principalTable: "Mutations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IllnessRecommendation",
                columns: table => new
                {
                    IllnessesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RecommendationsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IllnessRecommendation", x => new { x.IllnessesId, x.RecommendationsId });
                    table.ForeignKey(
                        name: "FK_IllnessRecommendation_Illnesses_IllnessesId",
                        column: x => x.IllnessesId,
                        principalTable: "Illnesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IllnessRecommendation_Recommendations_RecommendationsId",
                        column: x => x.RecommendationsId,
                        principalTable: "Recommendations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GeneTestMethod",
                columns: table => new
                {
                    GenesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TestMethodsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneTestMethod", x => new { x.GenesId, x.TestMethodsId });
                    table.ForeignKey(
                        name: "FK_GeneTestMethod_Genes_GenesId",
                        column: x => x.GenesId,
                        principalTable: "Genes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GeneTestMethod_TestMethods_TestMethodsId",
                        column: x => x.TestMethodsId,
                        principalTable: "TestMethods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diagnoses_Name",
                table: "Diagnoses",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GeneMutation_MutationsId",
                table: "GeneMutation",
                column: "MutationsId");

            migrationBuilder.CreateIndex(
                name: "IX_Genes_Name",
                table: "Genes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GeneTestMethod_TestMethodsId",
                table: "GeneTestMethod",
                column: "TestMethodsId");

            migrationBuilder.CreateIndex(
                name: "IX_Illnesses_Name",
                table: "Illnesses",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_IllnessRecommendation_RecommendationsId",
                table: "IllnessRecommendation",
                column: "RecommendationsId");

            migrationBuilder.CreateIndex(
                name: "IX_Mutations_Name",
                table: "Mutations",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recommendations_Name",
                table: "Recommendations",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StaffMember_Name",
                table: "StaffMember",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestMethods_Name",
                table: "TestMethods",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Diagnoses");

            migrationBuilder.DropTable(
                name: "GeneMutation");

            migrationBuilder.DropTable(
                name: "GeneTestMethod");

            migrationBuilder.DropTable(
                name: "IllnessRecommendation");

            migrationBuilder.DropTable(
                name: "StaffMember");

            migrationBuilder.DropTable(
                name: "Mutations");

            migrationBuilder.DropTable(
                name: "Genes");

            migrationBuilder.DropTable(
                name: "TestMethods");

            migrationBuilder.DropTable(
                name: "Illnesses");

            migrationBuilder.DropTable(
                name: "Recommendations");
        }
    }
}
