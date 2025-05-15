using System.Net;
using System.Net.Mail;

namespace resturantApi.SMTP
{
    public static class Mailer
    {
        public static void SendEmail(string toEmail, string subject, string body)
        {
            var fromAddress = new MailAddress("yheiaelkordy@gmail.com", "Restaurant Management System");
            var toAddress = new MailAddress(toEmail);
            const string fromPassword = "snoc aqls qggq admm"; 
            
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
