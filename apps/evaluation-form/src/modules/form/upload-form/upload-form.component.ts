import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'school-evaluation-form-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
  @ViewChild('fileUpload', { static: true, read: ElementRef })
  fileBrowserEl!: ElementRef<HTMLElement>;

  uploadFileTxt = new BehaviorSubject<string>('');

  ngOnInit(): void {
    fromEvent<Event>(this.fileBrowserEl.nativeElement, 'change')
      .pipe(
        tap({
          next: (event) => {
            const file = (event.target as HTMLInputElement).files?.[0]?.name;

            console.log(file);

            this.uploadFileTxt.next(file ? `ไฟล์ที่เลือก ${file}` : '');
          },
        })
      )
      .subscribe();
  }

  onFileBrowserClick(event: Event) {
    event.preventDefault();
    this.fileBrowserEl.nativeElement.click();
  }
}
