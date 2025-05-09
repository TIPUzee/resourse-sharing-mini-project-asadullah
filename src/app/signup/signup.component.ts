import { Component } from '@angular/core';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { UserService } from '../services/user.service'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Server } from '../config/server'


@Component({
  selector: 'app-signup',
    imports: [
        HlmInputModule,
        HlmButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent
{
    
    name = new FormControl('');
    email = new FormControl('');
    password = new FormControl('');

    constructor(
        protected user: UserService
    ) {}
    
    signup()
    {
        fetch(Server.url + '/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name.value as string,
                email: this.email.value as string,
                password: this.password.value as string
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.user.login(this.email.value as string, this.password.value as string)
            }
        })
        .catch(err => console.error(err))
    }
}
