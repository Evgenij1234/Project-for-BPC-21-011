using Microsoft.AspNetCore.Mvc;
using first_player.Models;
using first_player.Services.ServicesContext;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace first_player.Services.JWT
{
    
    public class ClasToken 
    {
        private ApplicationContext db_people;
        public ClasToken(ApplicationContext context)
        {
            db_people = context;
        }
        public IResult Login(Users loginData)
        {
            var result = db_people.Users;
            Users? person = result.FirstOrDefault(p => p.email == loginData.email && p.passwords == loginData.passwords);
            if (person is null) return Results.Unauthorized();

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, person.email) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(1)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            // формируем ответ
            var response = new
            {
                accessToken = encodedJwt,
                username = person.email,
                UsersId = person.Id,
                Usersnickname = person.nickname,
                Usersimagepath = person.imagepath,
                Userscreatetime = person.createtime
            };

            return Results.Json(response);
        }
    }
}
