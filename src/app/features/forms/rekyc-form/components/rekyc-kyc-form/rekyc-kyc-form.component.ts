import { Component, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rekyc-kyc-form',
  templateUrl: './rekyc-kyc-form.component.html',
  styleUrls: ['./rekyc-kyc-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RekycKycFormComponent implements AfterViewInit {
  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const iframe = this.pdfViewer.nativeElement;
    iframe.onload = () => {
      // eslint-disable-next-line no-console
      console.log('PDF form iframe loaded');
    };
  }

  getIframeHtml(): string | null {
    const iframe = this.pdfViewer.nativeElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    return doc?.documentElement.outerHTML ?? null;
  }

  sendHtmlToServer() {
    const html = this.getIframeHtml();
    if (html) {
      this.http
        .post('/api/generate-pdf', { html }, { responseType: 'blob' })
        .subscribe((pdfBlob) => {
          // Optionally download the PDF
          const blobUrl = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = 'generated.pdf';
          a.click();
          URL.revokeObjectURL(blobUrl);
        });
    } else {
      // eslint-disable-next-line no-console
      console.warn('Iframe HTML is empty or not loaded yet');
    }
  }
}
