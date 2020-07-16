module.exports = {
    HTML: function(css, js, title, header, content, footer) {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet", href="./css/style.css">
                ${css}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
                <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap" rel="stylesheet">
                <link rel="shortcut icon" type="image/x-icon" href="./image/web-logo.png">
                ${title}
            </head>
            <body>
                ${header}
                
                ${content}
                
                ${footer}
    
                <button id="scroll-top" onclick="scrollTopFunc()"><i class="fas fa-arrow-up"></i></button>

                ${js}
            </body>
        </html>
        `;
    }
}