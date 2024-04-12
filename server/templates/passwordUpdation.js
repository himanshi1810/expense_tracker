exports.passwordUpdationMai = (email) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            .container{
                font-family: Arial, sans-serif;
                padding: 50dp;
            }
            .body{
                width: 600px;
                text-align: center;
                margin: 0 auto;
                font-size: 18px;
            }
            .title{
                font-size: 24px;
                color: #069e82;
                margin-bottom: 17px;
                margin-top: 75px;
            }
            .email{
                color: blue;
    
            }
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
        </style>
    </head>
    <body class="container">
        <div class="body">
            <div>
                <h1 class="title">Password Updation Email</h1>
            </div>
            <div class="description">
                <p class="greeting">Dear User,</p>
                <p class="message">Your password has been successfully updated for email <span class="email">${email}</span></p>
                <p class="warning">If you did not updated your password, please contact us immediately to secure your account.</p>
                <div class="support">
                    If you have any doubt or issue, feel free to contact us on email 
                    <a href="mailto:aanchalpatel4404@gmail.com">anchalpatel4404@gmail.com</a>
                    <br>
                    We are here to help !
                </div>
            </div>
        </div>
    </body>
    </html>`
}