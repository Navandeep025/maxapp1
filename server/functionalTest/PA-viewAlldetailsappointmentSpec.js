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

  it('Patient must be all details of an appointment', function(done) {

    b.chain(function(err) {
      done(err);
    })
    .init({
      browserName: 'firefox'
    })
    .get("http://localhost:3000/")
    .elementById("//div[@id='app']/div/div/div[2]/div/form/div[1]/div/input", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "PA3", noop);
      });
    })
    .elementById("//div[@id='app']/div/div/div[2]/div/form/div[2]/div/input", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "maxapp@123", noop);
      });
    })
    .elementById("//div[@id='app']//button[.='Submit']", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByCssSelector("div.rt-td", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "AP31");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Appointment Detail Test BloodDate 05/09/2017Time 16:00-18:00Status Unassigned");
      });
    })
      .close(function(err) {
      done(err);
    });

  });
});

afterEach(function() {
  b.quit();
});
