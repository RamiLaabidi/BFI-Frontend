import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signature-input',
  templateUrl: './signature-input.component.html',
  styleUrls: ['./signature-input.component.css']
})
export class SignatureInputComponent implements AfterViewInit {
  @ViewChild('canvasEl') canvas!: ElementRef<HTMLCanvasElement>; // Using definite assignment assertion

  private ctx: CanvasRenderingContext2D | null = null; // Initialize as null
  @Output() signatureCaptured: EventEmitter<string> = new EventEmitter<string>(); // Changed to string type

  constructor() { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = '#000';
    }
  }

  clearCanvas() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  }

  saveSignature() {
    if (this.ctx) {
      const signatureDataUrl = this.canvas.nativeElement.toDataURL();
      this.signatureCaptured.emit(signatureDataUrl); // Emit the data URL to the parent component
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.ctx && event.buttons === 1) {
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }
}