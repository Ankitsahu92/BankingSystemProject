using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingSystem.Entity.Migrations
{
    public partial class add1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MakeCheckboxRequest",
                table: "Users",
                newName: "MakeCheckbookRequest");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2022, 10, 25, 18, 24, 53, 113, DateTimeKind.Local).AddTicks(9219));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MakeCheckbookRequest",
                table: "Users",
                newName: "MakeCheckboxRequest");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2022, 10, 25, 17, 53, 0, 829, DateTimeKind.Local).AddTicks(5175));
        }
    }
}
