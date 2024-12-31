import { Component } from '@angular/core';
import { MonsterApiService } from '../../services/monster-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ImageGeneratorComponent {
  prompt: string = '';
  negprompt: string = 'deformed, bad anatomy, disfigured, poorly drawn face'; // Default negprompt
  aspectRatio: string = 'square'; // Default aspect ratio
  style: string = 'anime'; // Default style
  guidanceScale: number = 7.5; // Default guidance scale
  steps: number = 15; // Default steps
  generatedImage: string | null = null;
  isLoading: boolean = false;

  constructor(private monsterApiService: MonsterApiService) {}

  async onGenerateImage() {
    if (this.prompt.trim()) {
      this.isLoading = true;
      this.generatedImage = null; // Clear previous image
      try {
        const requestBody = {
          safe_filter: true,
          aspect_ratio: this.aspectRatio,
          guidance_scale: this.guidanceScale,
          negprompt: this.negprompt, // Add negprompt to the request
          prompt: this.prompt,
          samples: 1,
          seed: Math.floor(Math.random() * 10000),
          steps: this.steps, // Add steps to the request
          style: this.style,
        };

        const result = await this.monsterApiService.generateImage(requestBody);

        if (result.status_url) {
          const imageData = await this.pollStatus(result.status_url);
          if (imageData?.result?.output?.[0]) {
            this.generatedImage = imageData.result.output[0]; // Extract the image URL
          }
        }
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async pollStatus(statusUrl: string): Promise<any> {
    const maxRetries = 10;
    const delay = 2000;
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        const statusResponse = await this.monsterApiService.checkStatus(statusUrl);

        if (statusResponse?.status === 'COMPLETED') {
          return statusResponse;
        }
        if (statusResponse?.status === 'FAILED') {
          throw new Error('Image generation failed');
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        attempts++;
      } catch (error) {
        console.error('Error during status polling:', error);
        throw error;
      }
    }
    throw new Error('Image generation timed out');
  }


  private negativeKeywords: string[] = [
    'blurry', 'low resolution', 'distorted', 'poor quality', 'pixelated', 'disfigured', 'bad anatomy', 'overexposed', 'underexposed', 'poorly drawn face'
  ];

  // Method to generate a random negative prompt from predefined keywords
  generateNegativePrompt(): void {
    const randomNegativeWords = this.negativeKeywords.slice(0, 5).join(', '); // Select first 5 keywords
    this.negprompt = randomNegativeWords;
  }

  // Trigger auto generation when user starts typing in the prompt field
  onPromptInput(): void {
    if (!this.prompt.trim()) {
      this.negprompt = ''; // Reset negative prompt if the user clears the main prompt
    } else {
      this.generateNegativePrompt();
    }
  }

}

