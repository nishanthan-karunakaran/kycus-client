import { Component, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rekyc-kyc-form',
  templateUrl: './rekyc-kyc-form.component.html',
  styleUrls: ['./rekyc-kyc-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RekycKycFormComponent implements AfterViewInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef;

  ngAfterViewInit(): void {
    this.renderPdfLikePreview();
  }

  // renderPdfLikePreview() {
  //   const iframe: HTMLIFrameElement = this.pdfViewer.nativeElement;
  //   const doc = iframe.contentDocument || iframe.contentWindow?.document;
  //   const htmlContent = this.pdfContent.nativeElement.innerHTML;

  //   const fullHtml = `
  //     <html>
  //       <head>
  //         <style>
  //           body {
  //             margin: 0;
  //             padding: 0;
  //             font-family: Arial, sans-serif;
  //             background: #f0f0f0;
  //           }
  //           .pdf-page {
  //             width: 210mm;
  //             height: 297mm;
  //             margin: 10px auto;
  //             padding: 20mm;
  //             background: white;
  //             box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  //             box-sizing: border-box;
  //             overflow: hidden;
  //             page-break-after: always;
  //           }

  //           @media print {
  //             body {
  //               background: white;
  //             }
  //             .pdf-page {
  //               box-shadow: none;
  //               margin: 0;
  //               page-break-after: always;
  //             }
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         ${htmlContent}
  //       </body>
  //     </html>
  //   `;

  //   if (doc) {
  //     doc.open();
  //     doc.write(fullHtml);
  //     doc.close();
  //   }
  // }

  renderPdfLikePreview() {
    const iframe: HTMLIFrameElement = this.pdfViewer.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    const pdfContent = this.pdfContent.nativeElement;

    // Collect styles from document <head>
    const styleTags = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((tag) => tag.outerHTML)
      .join('\n');

    const html = `
    <html>
      <head>
        ${styleTags}
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #eee !important;
          }
          .pdf-page {
            width: 210mm;
            height: 297mm;
            margin: 10px auto;
            padding: 5mm;
            background: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            overflow: hidden;
            page-break-after: always;
          }

          @media print {
            body {
              background: white;
            }
            .pdf-page {
              box-shadow: none;
              margin: 0;
              page-break-after: always;
            }
          }
        </style>
      </head>
      <body>
        ${pdfContent.innerHTML}
      </body>
    </html>
  `;

    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }
}
