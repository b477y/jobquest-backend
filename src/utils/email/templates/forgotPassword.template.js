const forgotPasswordTemplate = ({ OTP } = {}) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
              * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
              }
              body {
                  background-color: #f4f4f4;
                  font-family: Arial, sans-serif;
                  padding: 20px;
              }
              .container {
                  width: 100%;
                  max-width: 400px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
                  padding: 20px;
              }
              .header {
                  background: #6C63FF;
                  color: #fff;
                  padding: 15px;
                  font-size: 22px;
                  font-weight: bold;
                  border-radius: 10px 10px 0 0;
              }
              .content {
                  padding: 20px;
              }
              .otp {
                  font-size: 24px;
                  font-weight: bold;
                  color: #6C63FF;
                  background: #f1f1f1;
                  display: inline-block;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                  margin-bottom: 15px;
              }
              .otp-message {
                  margin-top: 20px;
              }
              .footer {
                  background: #6C63FF;
                  color: #fff;
                  padding: 10px;
                  font-size: 14px;
                  border-radius: 0 0 10px 10px;
              }
              .button {
                  background: #6C63FF;
                  color: #fff;
                  text-decoration: none;
                  padding: 10px 20px;
                  display: inline-block;
                  margin-top: 20px;
                  border-radius: 5px;
                  font-size: 16px;
              }
          </style>
      </head>
      <body>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                  <td align="center">
                      <div class="container">
                          <div class="header">Reset Your Password</div>
    
                          <div class="content">
                              <p>We received a request to reset your password. Use the code below to proceed.</p>
                              <div class="otp">${OTP}</div>
                              <p class="otp-message">If you didn’t request this, you can ignore this email.</p>
                          </div>
    
                          <div class="footer">
                              Stay connected with us
                          </div>
                      </div>
                  </td>
              </tr>
          </table>
      </body>
      </html>`;
};

export default forgotPasswordTemplate;
