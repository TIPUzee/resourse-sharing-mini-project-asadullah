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
    type: 'Provider' | 'Client' = 'Client'
    
    
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
        this.type = this.cookieService.get('type') as any || 'Client'
    }
    
    
    logout()
    {
        this.cookieService.delete('id')
        this.cookieService.delete('name')
        this.cookieService.delete('type')
        
        this.loadUser()
    }
    
    
    isLoggedIn()
    {
        return this.id > 0
    }
    
    
    login(name: string, password: string)
    {
        return new Promise((resolve, reject) => {
            fetch(Server.url + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    password
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    reject(res.error)
                } else {
                    this.cookieService.set('id', res.id)
                    this.cookieService.set('name', res.name)
                    this.cookieService.set('type', res.type)
                    
                    this.loadUser()
                    console.log(this.id, this.name, this.type)
                    resolve(res)
                }
            })
            .catch(err => reject(err))
        })
    }
}
