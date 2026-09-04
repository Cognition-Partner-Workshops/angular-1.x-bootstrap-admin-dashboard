import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <div class="widgets">
      <div class="row">
        <div class="col-md-12">
          <ba-panel title="Google Maps" baPanelClass="viewport100">
            <div id="google-maps"></div>
          </ba-panel>
        </div>
      </div>
    </div>
  `,
})
export class GoogleMapsComponent implements AfterViewInit {
  private readonly loader = inject(GoogleMapsLoaderService);
  private readonly element = inject(ElementRef<HTMLElement>);

  async ngAfterViewInit(): Promise<void> {
    try {
      await this.loader.load();
      const mapCanvas = this.element.nativeElement.querySelector('#google-maps');
      if (!mapCanvas) return;
      new google.maps.Map(mapCanvas, {
        center: { lat: 44.5403, lng: -78.5463 },
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
    } catch (error) {
      console.warn('Unable to load Google Maps', error);
    }
  }
}
