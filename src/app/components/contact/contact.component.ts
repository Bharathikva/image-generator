// contact.component.ts
import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const serviceID = 'service_srrlbgl';
      const templateID = 'template_xf543mn';
      const publicKey = 'tzjdXmWKnI42NYeID';
      
      emailjs.send(serviceID, templateID, formData, publicKey)
        .then(response => {
          alert('Message sent successfully!');
          this.contactForm.reset();
        })
        .catch(error => {
          console.error('Email sending error:', error);
        });
    }
  }
}
