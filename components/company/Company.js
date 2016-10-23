const React = require('react');

module.exports = {

  Company: function(props) {
    return (
      <div className="company-panel">
        <h2 className='company-panel__title'>Bedriftsinformasjon</h2>
        <label className='company-panel__label' for='company-name' />
        <input className='company-panel__input'/>
      </div>
    );
  }

}
