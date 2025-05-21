import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'ui-circular-masked-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-circular-masked-loader.component.html',
  styleUrls: ['./ui-circular-masked-loader.component.scss'],
})
export class UiCircularMaskedLoaderComponent implements OnInit, OnChanges {
  @Input() class = 'size-4';
  @Input() colorName = 'primary';
  loaderClass = '';

  ngOnInit(): void {
    this.updateClass();
  }

  ngOnChanges(): void {
    this.updateClass();
  }

  updateClass() {
    this.loaderClass = this.class;
  }
}
