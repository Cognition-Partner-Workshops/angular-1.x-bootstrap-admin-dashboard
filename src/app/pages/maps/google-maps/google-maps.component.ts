import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <app-ba-panel title="Google Maps">
      <div class="map-placeholder">
        <iframe
          width="100%"
          height="450"
          style="border:0"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12094.57348593182!2d-73.9865812!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1635789012345">
        </iframe>
      </div>
    </app-ba-panel>
  `,
  styles: [`.map-placeholder { border-radius: 4px; overflow: hidden; }`],
})
export class GoogleMapsComponent {}
