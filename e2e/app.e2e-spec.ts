import { RxjsRocksPage } from './app.po';

describe('rxjs-rocks App', function() {
  let page: RxjsRocksPage;

  beforeEach(() => {
    page = new RxjsRocksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
