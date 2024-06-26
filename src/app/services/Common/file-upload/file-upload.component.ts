import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { FileUploadDialogComponent, FileUploadDialogState} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base/base.component';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.Timer)
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          const message: string = "Dosyalar başarıyla yüklenmiştir.";

          this.spinner.hide(SpinnerType.Timer);
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                
                messageType: MessageType.Success,
                position: Position.TopRight,
                delay:5,
                dismissOthers:true
              })
          } else {
            this.customToastrService.showMessage(message, "Başarılı.", {
              toastMessageType: ToastrMessageType.Success,
              toastPosition: ToastrPosition.TopRight
            })
          }


        }, (errorResponse: HttpErrorResponse) => {

          const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";

          this.spinner.hide(SpinnerType.Timer)
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                
                messageType: MessageType.Error,
                position: Position.TopRight
              })
          } else {
            this.customToastrService.showMessage(message, "Başarsız.", {
              toastMessageType: ToastrMessageType.Error,
              toastPosition: ToastrPosition.TopRight
            })
          }

        });
      }
    });
  }

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //    width: '250px',
  //    data: FileUploadDialogState.Yes,
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == FileUploadDialogState.Yes)
  //      afterClosed();
  //  });
  //}

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}