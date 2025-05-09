import { Component } from '@angular/core'
import { Server } from '../config/server'


@Component({
    selector: 'app-posts',
    imports: [],
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss'
})
export class PostsComponent
{
    readonly Server = Server
    
    posts: {
        id: number,
        title: string,
        caption: string,
        imageOrVideo: string,
        location: string,
        people: string
    }[] = []
    
    
    constructor()
    {
        this.load()
    }
    
    
    load()
    {
        this.posts = []
        
        fetch(Server.url + '/posts')
            .then(res => res.json())
            .then(res =>
            {
                if (res.error)
                {
                    alert(res.error)
                }
                else
                {
                    this.posts = res.posts
                    console.log(this.posts)
                }
            })
            .catch(err =>
            {
                console.error(err)
                alert(err)
            })
    }
    
    
    isImage(url: string)
    {
        if (!url) return null
        return url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')
    }
    
    reformat(url: string)
    {
        return '/' + url.replace('\\', '/')
    }
}
