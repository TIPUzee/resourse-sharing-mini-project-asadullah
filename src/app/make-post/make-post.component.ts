import { Component } from '@angular/core'
import { HlmInputModule } from '@spartan-ng/ui-input-helm'
import { HlmButtonModule } from '@spartan-ng/ui-button-helm'
import { UserService } from '../services/user.service'
import { FormControl, FormsModule, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms'
import { Server } from '../config/server'


@Component({
    selector: 'app-make-post',
    imports: [
        HlmInputModule,
        HlmButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './make-post.component.html',
    styleUrl: './make-post.component.scss'
})
export class MakePostComponent
{
    form = new FormGroup({
        imageOrVideo: new FormControl(''),
        title: new FormControl(''),
        caption: new FormControl(''),
        location: new FormControl(''),
        people: new FormControl('')
    })
    // imageOrVideo = new FormControl('')
    // title = new FormControl('')
    // caption = new FormControl('')
    // location = new FormControl('')
    // people = new FormControl('')
    
    constructor(
        protected user: UserService
    )
    {}
    
    
    makePost()
    {
        if (this.form.invalid)
        {
            return alert('Please fill out all fields properly')
        }
        
        const formData = new FormData()
        formData.append('imageOrVideo', this.form.value.imageOrVideo as any)
        formData.append('userId', this.user.id as any)
        formData.append('title', this.form.value.title as any)
        formData.append('caption', this.form.value.caption as any)
        formData.append('location', this.form.value.location as any)
        formData.append('people', this.form.value.people as any)
        
        // Blob fields
        fetch(Server.url + '/make-post', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res =>
            {
                if (res.error)
                {
                    alert(res.error)
                }
                else
                {
                    alert('Post made successfully')
                    this.form.reset()
                }
            })
            .catch(err =>
            {
                console.error(err)
                alert('Something went wrong')
            })
    }
    
    
    onFileChange(event: any)
    {
        if (event.target.files.length > 0)
        {
            const file = event.target.files[0] // Get the File object
            this.form.get('imageOrVideo')?.setValue(file) // Update form control with File
        }
    }
}
