var wd = require('wd'),
    chai = require('chai'),
    expect = chai.expect,
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid-js');

var VARS = {};

// This assumes that selenium is running at http://127.0.0.1:4444/wd/hub/
var noop = function() {},
    b = wd.promiseChainRemote();

describe('Max app functional testing', function() {

  this.timeout(60000);

  it('Customer care must be able to reschedule an existing appointment', function(done) {

    b.chain(function(err) {
      done(err);
    })
    .init({
      browserName: 'firefox'
    })
    .get("http://localhost:3000/")
    .elementById("ui input", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "callcenter", noop);
      });
    })
    .elementById("ui input", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "callcenter", noop);
      });
    })
    .elementById("ui orange button", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Max Health Care");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Welcome callcenter(Customer care)");
      });
    })
    .elementByCssSelector("div.row", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementById("ui orange icon", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementById("//div[@class='center']/div/div/div[2]/div/div[3]/div/div/div[1]/table/tbody/tr[4]/td[7]/i[2]", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Enter Patient's Preferred Date and Time");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Enter Patient's Preferred Date and Time09:00-11:0011:00-13:0014:00-16:0016:00-18:0011:00-13:0009:00-11:0011:00-13:0014:00-16:0016:00-18:00Reschedule");
      });
    })
    .elementById("field", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "2017-08-31", noop);
      });
    })
    .elementById("ui selection dropdown", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "11.00-13.00", noop);
      });
    })
    .elementByCssSelector("i.dropdown.icon", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementById("ui orange button", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .close(function(err) {
      done(err);
    });

  });
});

afterEach(function() {
  b.quit();
});
