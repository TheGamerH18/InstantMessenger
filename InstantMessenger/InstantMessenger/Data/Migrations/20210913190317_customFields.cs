using Microsoft.EntityFrameworkCore.Migrations;

namespace InstantMessenger.Data.Migrations
{
    public partial class customFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chat_AspNetUsers_recieverId",
                table: "Chat");

            migrationBuilder.DropForeignKey(
                name: "FK_Chat_AspNetUsers_senderId",
                table: "Chat");

            migrationBuilder.RenameColumn(
                name: "senderId",
                table: "Chat",
                newName: "SenderId");

            migrationBuilder.RenameColumn(
                name: "recieverId",
                table: "Chat",
                newName: "RecieverId");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "Chat",
                newName: "Date");

            migrationBuilder.RenameIndex(
                name: "IX_Chat_senderId",
                table: "Chat",
                newName: "IX_Chat_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Chat_recieverId",
                table: "Chat",
                newName: "IX_Chat_RecieverId");

            migrationBuilder.AddColumn<string>(
                name: "firstname",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Chat_AspNetUsers_RecieverId",
                table: "Chat",
                column: "RecieverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Chat_AspNetUsers_SenderId",
                table: "Chat",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chat_AspNetUsers_RecieverId",
                table: "Chat");

            migrationBuilder.DropForeignKey(
                name: "FK_Chat_AspNetUsers_SenderId",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "firstname",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Chat",
                newName: "senderId");

            migrationBuilder.RenameColumn(
                name: "RecieverId",
                table: "Chat",
                newName: "recieverId");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Chat",
                newName: "date");

            migrationBuilder.RenameIndex(
                name: "IX_Chat_SenderId",
                table: "Chat",
                newName: "IX_Chat_senderId");

            migrationBuilder.RenameIndex(
                name: "IX_Chat_RecieverId",
                table: "Chat",
                newName: "IX_Chat_recieverId");

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
    }
}
