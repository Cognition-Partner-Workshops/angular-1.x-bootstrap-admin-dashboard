import { FileReaderService } from './file-reader.service';

describe('FileReaderService', () => {
  it('creates', () => {
    expect(new FileReaderService()).toBeTruthy();
  });

  it('reads a real Blob as a data URL', (done) => {
    const service = new FileReaderService();
    service.readAsDataUrl(new Blob(['hi'])).then((result) => {
      expect(result).toContain('data:');
      done();
    });
  });
});
