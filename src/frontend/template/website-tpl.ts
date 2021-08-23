export const WebTpl = () => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <link rel="icon" href="logo.svg" type="image/svg+xml">
            <link rel="stylesheet" href="style.css">
            <title>白眉居</title>
        </head>
        <body>
        <noscript>Please allow javascript in your browser</noscript>
        <script type="module" src="bundle.js"></script>
        </body>
        </html>`
    );
}