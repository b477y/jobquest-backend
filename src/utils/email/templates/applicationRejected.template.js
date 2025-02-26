const applicationRejectedTemplate = () => {
  return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Rejected</title>
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
                    background: #dc3545;
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
                    background: #dc3545;
                    color: #fff;
                    padding: 10px;
                    font-size: 14px;
                    border-radius: 0 0 10px 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Application Update</div>
                <div class="content">
                    <p class="message">Thank you for your application. After careful consideration, we regret to inform you that your application has not been selected at this time.</p>
                    <p class="message">We appreciate your effort and encourage you to apply for future openings.</p>
                </div>
                <div class="footer">Best Regards,<br> The Hiring Team</div>
            </div>
        </body>
        </html>`;
};

export default applicationRejectedTemplate;
