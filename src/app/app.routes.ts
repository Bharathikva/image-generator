import { Routes } from '@angular/router';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FaqComponent } from './components/faq/faq.component';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'imageAi', component: ImageGeneratorComponent },
    { path: 'privacy-policy', component: PrivacyComponent },
    { path: 'terms-of-service', component: TermsComponent },
    { path: 'contact', component: ContactComponent },
];
