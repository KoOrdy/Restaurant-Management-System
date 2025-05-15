using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace resturantApi.Migrations
{
    /// <inheritdoc />
    public partial class menuItemImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "OrderItems");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "MenuItems",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "MenuItems");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "OrderItems",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
