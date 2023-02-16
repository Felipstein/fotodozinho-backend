export class NotFoundHTMLTemplate {

  static getHTML(url: string, method: string) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Error</title>
        </head>
        <body>
          <pre>Cannot ${method.toUpperCase()} ${url}</pre>
        </body>
      </html>
    `;
  }

}
