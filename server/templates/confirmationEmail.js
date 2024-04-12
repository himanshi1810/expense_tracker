exports.confirmationEmail = (email, groupName, link) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            .body{
                width: 600px;
                margin: 0 auto;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20dp;
            }
            .title{
                font-size: 24px;
                color: #069e82;
                margin: 20px 0;
            }
            .description{
                font-size: 16px;
            }
            .highlight{
                font-size: 17px;
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
                <h1 class="title">Confirmation Email</h1>
            </div>
            <div class="description">
                <p>Dear User</p>
                <p>We are happy to tell you that your friend <a href="${email}" class="highlight">${email}</a> wants you to join group <span class="highlight">${groupName}</span></p>
                <p>The perpose of this group is to make the process of expenss process simple and reduce your burdon to remember everything!</p>
                <p>To enter the group pleas clock on the below link and give you confirmation : 
                    <a href="${link}" class="highlight">${link}</a>
                </p>
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