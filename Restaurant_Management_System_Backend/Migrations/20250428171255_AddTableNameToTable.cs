using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace resturantApi.Migrations
{
    /// <inheritdoc />
    public partial class AddTableNameToTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TableName",
                table: "Tables",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TableName",
                table: "Tables");
        }
    }
}
