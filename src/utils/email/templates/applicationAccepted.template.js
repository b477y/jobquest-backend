const applicationAcceptedTemplate = () => {
  return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Accepted</title>
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
                    background: #28a745;
                    color: #fff;
                    padding: 15px;
                    font-size: 22px;
                    font-weight: bold;
                    border-radius: 10px 10px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .message {
                    font-size: 16px;
                    margin-top: 20px;
                }
                .footer {
                    background: #28a745;
                    color: #fff;
                    padding: 10px;
                    font-size: 14px;
                    border-radius: 0 0 10px 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Congratulations!</div>
                <div class="content">
                    <p class="message">We are pleased to inform you that your application has been accepted.</p>
                    <p class="message">We will be in touch with the next steps.</p>
                </div>
                <div class="footer">Best Regards,<br> The Hiring Team</div>
            </div>
        </body>
        </html>`;
};

export default applicationAcceptedTemplate;
