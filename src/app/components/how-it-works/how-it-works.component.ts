import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {
  apiCode = `
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ safe_filter: true }),
  };

  fetch('https://api.monsterapi.ai/v1/generate/txt2img', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
  `;
}
