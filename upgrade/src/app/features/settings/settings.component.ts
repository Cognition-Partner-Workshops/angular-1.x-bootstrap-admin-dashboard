import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatureFlagsPort, FeatureFlag } from '../../core/ports/feature-flags.port';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private featureFlagsPort = inject(FeatureFlagsPort);

  featureFlags: FeatureFlag[] = [];
  loading = true;

  settings = {
    theme: 'light',
    language: 'en',
    notifications: true,
    emailAlerts: false
  };

  ngOnInit(): void {
    this.loadFeatureFlags();
  }

  private loadFeatureFlags(): void {
    this.featureFlagsPort.getAllFlags().subscribe({
      next: (flags) => {
        this.featureFlags = flags;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load feature flags:', err);
        this.loading = false;
      }
    });
  }

  saveSettings(): void {
    console.log('Settings saved:', this.settings);
  }
}
