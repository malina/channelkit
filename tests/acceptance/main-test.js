import { test } from 'qunit';
import moduleForAcceptance from 'channelkit/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | main');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('expand group', function(assert) {
  visit('/');
  click('.with-children:first .button:first');
  andThen(() =>
    assert.equal(find('.with-children:first .has-children').hasClass("hide"), true)
  );
});
