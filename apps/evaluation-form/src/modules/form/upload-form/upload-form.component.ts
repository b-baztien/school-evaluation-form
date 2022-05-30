import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from '@school-evaluation-form/api-interfaces';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FormService } from 'apps/evaluation-form/src/services/form/form.service';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  finalize,
  first,
  fromEvent,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'school-evaluation-form-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
  @ViewChild('fileUpload', { static: true, read: ElementRef })
  fileBrowserEl!: ElementRef<HTMLElement>;

  uploadFileTxt = new BehaviorSubject<string>('');
  uploadFile = new BehaviorSubject<File | undefined>(undefined);

  userForm!: Partial<UserForm>;

  constructor(
    private formService: FormService,
    private rootStoreService: RootStoreService,
    private messageService: MessageService,
    private router: Router,
    private destroy$: TuiDestroyService,
    private spinner: NgxSpinnerService
  ) {
    this.rootStoreService.formUser$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userForm = data;
      });
  }

  ngOnInit(): void {
    fromEvent<Event>(this.fileBrowserEl.nativeElement, 'change')
      .pipe(
        map((event) => {
          const file = (event.target as HTMLInputElement).files?.[0];

          this.uploadFileTxt.next(
            file?.name ? `ไฟล์ที่เลือก ${file.name}` : ''
          );

          return file;
        })
      )
      .subscribe(this.uploadFile);

    this.formService.getSubmitSubject
      .pipe(
        tap({
          next: () => {
            this.onSubmit();
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSubmit() {
    const file = this.uploadFile.value;
    if (!file) {
      this.messageService.clear();

      this.messageService.add({
        severity: 'error',
        summary: 'ผิดพลาด',
        detail: 'กรุณาอัพโหลดไฟล์',
      });
      return;
    }

    this.formService
      .uploadFile(file!)
      .pipe(
        tap({
          subscribe: () => this.spinner.show(),
          error: (err) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: 'ผิดพลาด',
              detail: err.error.message,
            });
          },
        }),
        switchMap((fileName) => {
          this.userForm = {
            ...this.userForm,
            fileName,
            // username: this.user.username,
          };

          return this.formService.addUserForm(this.userForm).pipe(
            tap({
              next: (data) => {
                this.rootStoreService.submitForm(data);
                this.router.navigate(['/result']);
              },
            })
          );
        }),
        finalize(() => this.spinner.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onFileBrowserClick(event: Event) {
    event.preventDefault();
    this.fileBrowserEl.nativeElement.click();
  }
}
