import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() weathersFromHome: any;
  @Output() cancelRegisterMode = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    this.createRegisterRectiveForm();
  }

  createRegisterRectiveForm() {
    this.registerForm = this.fb.group({
      gender: ['', Validators.required],
      username: ['', Validators.required],
      knowsAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { 'mismatch': true };
  }

  register() {

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // debugger;
      // console.log(this.user);
      this.authService.register(this.user).subscribe(
        resp => { this.alertify.success('Registration Successful'); },
        err => {
          console.log(err);
          this.alertify.error('Registeration Failure');
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/memberList']);
          });
        }
      );
    }

    console.log(this.registerForm.value);
    // console.log(this.model);
    // this.authService.register(this.model).subscribe(
    //   () => { this.alertify.success('Register Successfully..'); },
    //   error => { this.alertify.error(error); }
    // );
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
  }
}
