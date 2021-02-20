import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileuploadService } from '../services/fileupload.service';
// import { FileuploadService } from '../service/fileupload.service';

@Component({
  selector: 'app-single-fileupload',
  templateUrl: './single-fileupload.component.html',
  styleUrls: ['./single-fileupload.component.css']
})
export class SingleFileuploadComponent implements OnInit, AfterViewInit {

  @Input('container') container: number; // tslint:disable-line: no-input-rename
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];
  filepath;
  uploadedFile;

  constructor(private service: FileuploadService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.service.findByContainer(this.container).subscribe(result => {
      this.filepath = '/img/' + result.filename;
    });

    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      const customFile = { data: file, inProgress: false, progress: 0 };
      this.uploadFile(customFile);
      // for (let index = 0; index < fileUpload.files.length; index++) {
      //   const file = fileUpload.files[index];
      //   console.log(file);
      //   this.files.push({ data: file, inProgress: false, progress: 0 });
      // }
      // this.uploadFiles();
    };
  }



  uploadFile(file): void {

    this.files.push(file);

    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;

    this.service.upload(this.container, formData).pipe(

      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),

      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          this.uploadedFile = event.body;
          this.filepath = '/img/' + this.uploadedFile.filename;
        }
      });
  }

  onClick(): void {
    this.fileUpload.nativeElement.click();
  }

}
