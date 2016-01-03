var tape = require('tape');
var formatDate = require('../.');

tape('formatDate(d, options)', function (t) {

  t.test('should default to ISO format', function (assert) {
    assert.plan(2);
    assert.strictEqual(formatDate(new Date(1973, 0, 2)), '1973-01-02');
    assert.strictEqual(formatDate(new Date(1973, 10, 30)), '1973-11-30');
  });

  t.test('should handle options.template as a string', function (assert) {
    assert.plan(3);
    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: '<%= DD %>/<%= MM %>/<%= YY %>' }), '02/01/1973');
    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: '<%= D %>/<%= M %>/<%= Y %>' }), '2/1/73');
    assert.strictEqual(formatDate(new Date(1973, 0, 2)), '1973-01-02', 'settings the template option should not change the default behavior');
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

    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: function (locals) {
      return locals.DD + ', ' + months[locals.MM] + ' ' + locals.YY;
    } }), '02, January 1973');
  });

  t.test('should handle hours, minutes and seconds', function (assert) {
    assert.plan(2);
    assert.strictEqual(formatDate(new Date(1973, 0, 2), { template: '<%= hh %>:<%= mm %>:<%= ss %>' }), '00:00:00');
    assert.strictEqual(formatDate(new Date(1973, 0, 2, 10, 15, 20), { template: '<%= hh %>:<%= mm %>:<%= ss %>' }), '10:15:20');
  });

});

