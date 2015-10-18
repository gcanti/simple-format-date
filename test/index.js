var tape = require('tape');
var formatDate = require('../.');

tape('formatDate(d, options)', function (t) {

  t.test('should default to US format', function (assert) {
    assert.plan(2);
    assert.strictEqual(formatDate(new Date(1973, 0, 2)), '01/02/1973');
    assert.strictEqual(formatDate(new Date(1973, 10, 30)), '11/30/1973');
  });

  t.test('should handle options.template as a string', function (assert) {
    assert.plan(2);
    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: '<%= DD %>/<%= MM %>/<%= YY %>' }), '02/01/1973');
    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: '<%= D %>/<%= M %>/<%= Y %>' }), '2/1/73');
  });

  t.test('should handle options.template as a function', function (assert) {
    assert.plan(1);

    var months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    };

    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: function (parts) {
      return parts.DD + ', ' + months[parts.MM] + ' ' + parts.YY;
    } }), '02, January 1973');
  });

});

