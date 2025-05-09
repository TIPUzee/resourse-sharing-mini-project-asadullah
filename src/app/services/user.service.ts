import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Server } from '../config/server'


@Injectable({
    providedIn: 'root'
})
export class UserService
{
    id = 0
    name = ''
    email = ''
    
    
    constructor(
        private cookieService: CookieService
    )
    {
        this.loadUser()
    }
    
    
    loadUser()
    {
        this.id = parseInt(this.cookieService.get('id'))
        this.name = this.cookieService.get('name')
        this.email = this.cookieService.get('email')
        
        console.log(this.id, this.name, this.email)
    }
    
    
    logout()
    {
        this.cookieService.delete('id')
        this.cookieService.delete('name')
        this.cookieService.delete('email')
        
        this.loadUser()
    }
    
    
    isLoggedIn()
    {
        return this.id > 0
    }
    
    
    login(email: string, password: string)
    {
        return new Promise((resolve, reject) =>
        {
            fetch(Server.url + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(res =>
                {
                    if (res.error)
                    {
                        reject(res.error)
                    }
                    else
                    {
                        if (res.login)
                        {
                            this.cookieService.set('id', res.user.id)
                            this.cookieService.set('name', res.user.name)
                            this.cookieService.set('email', res.user.email)
                            
                            this.loadUser()
                            resolve(res)
                        }
                        else
                        {
                            alert('Invalid credentials')
                            reject('Invalid credentials')
                        }
                    }
                })
                .catch(err => reject(err))
        })
    }
}
