import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UserService } from './services/user.service'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import {HlmButtonModule } from '@spartan-ng/ui-button-helm'
import { MakePostComponent } from './make-post/make-post.component'
import { PostsComponent } from './posts/posts.component'


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoginComponent, SignupComponent, HlmButtonModule, MakePostComponent, PostsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent
{
    wantsSignUp = false
    
    
    constructor(
        protected user: UserService
    )
    {}
}
