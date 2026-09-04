import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaConfigService } from '../../../theme';
import { DashboardMapComponent, buildMapAreas, buildMapLegend } from './dashboard-map.component';

describe('DashboardMapComponent', () => {
  let fixture: ComponentFixture<DashboardMapComponent>;
  let component: DashboardMapComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardMapComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('creates', () => expect(component).toBeTruthy());

  it('keeps the 28 legacy European areas with their user counts and colour groups', () => {
    const colors = TestBed.inject(BaConfigService).colors;
    const areas = buildMapAreas(colors);
    expect(areas.length).toBe(28);
    expect(component.areas).toEqual(areas);
    expect(areas.find((a) => a.id === 'AT')).toEqual({ title: 'Austria', id: 'AT', color: colors.primary, customData: '1 244', groupId: '1' });
    expect(areas.find((a) => a.id === 'PL')).toEqual(jasmine.objectContaining({ title: 'Poland', customData: '759', groupId: '2', color: colors.successLight }));
    expect(areas.find((a) => a.id === 'RO')).toEqual(jasmine.objectContaining({ title: 'Romania', customData: '302', groupId: '3', color: colors.success }));
    expect(areas.find((a) => a.id === 'HR')).toEqual(jasmine.objectContaining({ title: 'Croatia', customData: '96', groupId: '4', color: colors.danger }));
    expect(areas.filter((a) => a.groupId === '1').length).toBe(15);
    expect(areas.filter((a) => a.groupId === '2').length).toBe(9);
    expect(new Set(areas.map((a) => a.id)).size).toBe(28);
  });

  it('builds the four legend groups', () => {
    const colors = TestBed.inject(BaConfigService).colors;
    expect(buildMapLegend(colors)).toEqual([
      { title: 'over 1 000 users', color: colors.primary },
      { title: '500 - 1 000 users', color: colors.successLight },
      { title: '100 - 500 users', color: colors.success },
      { title: '0 - 100 users', color: colors.danger },
    ]);
  });

  it('renders the amCharts 5 map into #amChartMap centred on Europe', () => {
    const host = fixture.nativeElement.querySelector('#amChartMap') as HTMLElement;
    expect(host).toBeTruthy();
    expect(host.querySelector('canvas, svg')).toBeTruthy();
    expect(component.chart?.get('homeZoomLevel')).toBe(3.5);
    expect(component.chart?.get('homeGeoPoint')).toEqual({ longitude: 10, latitude: 52 });
    expect(component.chart?.get('panX')).toBe('none');
    expect(component.chart?.series.length).toBe(1);
  });

  it('disposes the amCharts root on destroy', () => {
    const root = component.root!;
    fixture.destroy();
    expect(root.isDisposed()).toBeTrue();
    expect(component.root).toBeUndefined();
  });
});
