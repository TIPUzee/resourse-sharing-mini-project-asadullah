import { Component } from '@angular/core'
import { HlmInputModule } from '@spartan-ng/ui-input-helm'
import { HlmButtonModule } from '@spartan-ng/ui-button-helm'
import { UserService } from '../services/user.service'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'


@Component({
    selector: 'app-login',
    imports: [
        HlmInputModule,
        HlmButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent
{
    
    email = new FormControl('')
    password = new FormControl('')
    
    
    constructor(
        protected user: UserService
    )
    {}
    
    
    async login()
    {
        await this.user.login(this.email.value as string, this.password.value as string)
    }
}
