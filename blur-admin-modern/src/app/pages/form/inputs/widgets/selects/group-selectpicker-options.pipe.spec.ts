import { GroupSelectpickerOptionsPipe } from './group-selectpicker-options.pipe';

describe('GroupSelectpickerOptionsPipe', () => {
  const pipe = new GroupSelectpickerOptionsPipe();
  it('matches case-insensitively and passes non-arrays through', () => {
    expect(pipe.transform([{ label: 'Alpha' }, { label: 'Beta' }], { label: 'ALP' })).toEqual([{ label: 'Alpha' }]);
    expect(pipe.transform('unchanged', { label: 'x' })).toBe('unchanged');
  });
});
