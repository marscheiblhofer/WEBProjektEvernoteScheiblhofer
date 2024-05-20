import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {NotelistEvernoteService} from "../shared/notelist-evernote.service";
import {User} from "../shared/user";
import {Notelist} from "../shared/notelist";

interface Response {
  access_token:string;
}

@Component({
  selector: 'bs-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  userId: string | undefined | null = null;
  user:User | undefined | null = undefined;

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private service: NotelistEvernoteService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
    if(this.isLoggedIn()) {
      this.userId = sessionStorage.getItem('userId');
      this.service.getUser()
        .subscribe((user) => {
          this.user = user[0];
        });
    }
  }

  login() {
    const val = this.loginForm.value;
    if(val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((res:any) => {
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/");
      })
    }

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
