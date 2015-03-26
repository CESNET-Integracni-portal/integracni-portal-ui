// spec.js

describe('Integracni portal', function() {

  beforeEach(function() {
    browser.get('http://147.32.80.219:8080/integracni-portal-ui/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('- Integrační portál');
  });
});
