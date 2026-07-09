import { Component, Input } from '@angular/core';

/**
 * Modern standalone port of the legacy AngularJS `ba-panel` directive.
 *
 * Renders the Blur Admin panel wrapper: a translucent rounded card with an
 * optional heading bar and a body that projects the caller's content.
 *
 * Legacy usage:
 *   <div ba-panel ba-panel-title="Feed" ba-panel-class="large-panel feed-panel">
 * becomes:
 *   <app-ba-panel title="Feed" panelClass="large-panel feed-panel">…</app-ba-panel>
 */
@Component({
  selector: 'app-ba-panel',
  standalone: true,
  imports: [],
  templateUrl: './ba-panel.component.html',
  styleUrl: './ba-panel.component.scss'
})
export class BaPanelComponent {
  /** Heading text; the heading bar renders only when a title is provided. */
  @Input() title?: string;

  /** Extra class(es) applied to the outer `.panel` (e.g. size/variant classes). */
  @Input() panelClass?: string;
}
