const React = require('react');
const expect = require('chai').expect;

const Enzyme = require('enzyme');
const shallow = Enzyme.shallow;

var Company = require('./../../../components/company/Company.js').Company;

describe('Company component', function() {

    it('should exist', function() {
        var wrapper = shallow( < Company / > )
        expect(wrapper).to.exist;
    });

});
