using Microsoft.EntityFrameworkCore.Migrations;

namespace InstantMessenger.Data.Migrations
{
    public partial class Chat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "reciever",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "sender",
                table: "Chat");

            migrationBuilder.AddColumn<string>(
                name: "recieverId",
                table: "Chat",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "senderId",
                table: "Chat",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chat_recieverId",
                table: "Chat",
                column: "recieverId");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_senderId",
                table: "Chat",
                column: "senderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chat_AspNetUsers_recieverId",
                table: "Chat",
                column: "recieverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Chat_AspNetUsers_senderId",
                table: "Chat",
                column: "senderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chat_AspNetUsers_recieverId",
                table: "Chat");

            migrationBuilder.DropForeignKey(
                name: "FK_Chat_AspNetUsers_senderId",
                table: "Chat");

            migrationBuilder.DropIndex(
                name: "IX_Chat_recieverId",
                table: "Chat");

            migrationBuilder.DropIndex(
                name: "IX_Chat_senderId",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "recieverId",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "senderId",
                table: "Chat");

            migrationBuilder.AddColumn<string>(
                name: "reciever",
                table: "Chat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "sender",
                table: "Chat",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
