import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserForm } from '@school-evaluation-form/api-interfaces';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FormService } from 'apps/evaluation-form/src/services/form/form.service';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  combineLatest,
  first,
  fromEvent,
  map,
  NEVER,
  of,
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

  user!: User;
  userForm!: Partial<UserForm>;

  constructor(
    private formService: FormService,
    private rootStoreService: RootStoreService,
    private messageService: MessageService,
    private router: Router,
    private destroy$: TuiDestroyService,
    private spinner: NgxSpinnerService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user')!) as User;

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
    console.log({ file });
    if (!file) {
      console.log('error');
      this.messageService.add({
        severity: 'error',
        summary: 'ผิดพลาด',
        detail: 'กรุณาอัพโหลดไฟล์',
      });
      return;
    }

    this.formService
      .uploadFile(this.user.username, file!)
      .pipe(
        tap({
          subscribe: () => this.spinner.show(),
          next: (fileName) => {
            this.userForm.fileName = fileName;

            this.rootStoreService.submitForm(this.userForm);

            this.router.navigate(['/result']);
          },

          finalize: () => this.spinner.hide(),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onFileBrowserClick(event: Event) {
    event.preventDefault();
    this.fileBrowserEl.nativeElement.click();
  }
}
