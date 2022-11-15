import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  status: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private modalService: BsModalService
  ) {}

  modalRef?: BsModalRef;

  @ViewChild('template')
  template!: TemplateRef<any>;

  LoginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  statusMessage: any;

  BaseURl = 'http://52.53.201.100:8000/api/v1';

  ngOnInit(): void {}

  onSubmit() {
    console.log('Working', this.LoginForm.value);
    console.log('Working', this.LoginForm);
    try {
      this.http
        .post(this.BaseURl + '/employee/user/login', this.LoginForm.value)
        .subscribe((res: any) => {
          console.log('response', res);
          this.statusMessage = res.message;
          this.status = res.status;
          console.log('response', this.statusMessage);
          this.modalRef = this.modalService.show(this.template, {
            backdrop: 'static',
            ignoreBackdropClick: false,
            class: 'modal-md modal-dialog-centered',
          });

          setTimeout(() => {
            this.modalRef?.hide();
            this.route.navigateByUrl('/dashboard');
          }, 2000);
        });
    } catch (error: any) {
      console.log('error111111111', error);
    }
  }
}
