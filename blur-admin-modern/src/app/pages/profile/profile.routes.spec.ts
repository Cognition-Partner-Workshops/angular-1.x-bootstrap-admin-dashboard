import { ProfileComponent } from './profile.component';
import { PROFILE_ROUTES } from './profile.routes';

describe('PROFILE_ROUTES', () => {
  it('exports the profile route with its title', () => {
    expect(PROFILE_ROUTES).toHaveSize(1);
    expect(PROFILE_ROUTES[0]).toEqual({
      path: '',
      component: ProfileComponent,
      data: { title: 'Profile' },
    });
  });
});
