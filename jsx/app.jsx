function App(properties) {
  return (
    <React.Fragment>
      <div className="jumbotron">
        <h1 className="mb-4">address data explorer</h1>
        <hr/>
        <div className="row mb-3">
          <div className="col sm-6">
            <span className="text-muted">select country</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <CountrySelector countries={properties.countries} onEffect={updateAddressFormat} />
          </div>
        </div>
      </div>
      <div className="container mb-3">
        <h3>output forms</h3>
        <div id="addressFormat"></div>
      </div>
      <div className="container">
        <h3>entry forms</h3>
        <div id="addressEntry"></div>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(<App countries={ehom.i18n.addressData}/>, document.getElementById('app'));

(function displayAddressFormat(countryCode) {
  updateAddressFormat(countryCode);
})('US');

function CountrySelector(properties) {
  const [inputText, setInputText] = React.useState('');
  
  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  
  React.useEffect(() => {
    console.debug("useEffect");

    if (inputText.length > 0) {
      console.debug(`Update output section with address format for ${inputText}`);
      properties.onEffect(inputText);
    }
  });
  
  const options = Object.keys(properties.countries).map((code) => {
    if (properties.countries[code].name) {
      return <option value={code}>{properties.countries[code]['name']}</option>;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  });
  
  return (
    <select id="country-selector" className="form-control" onChange={handleChange}>
      {options}
    </select>
  );
}

function updateAddressFormat(countryCode) {
  console.debug("updateAddressFormat: ", countryCode);
  ReactDOM.render(<AddressFormat countryCode={countryCode} />, document.getElementById('addressFormat'));
  ReactDOM.render(<AddressEntryForm countryCode={countryCode} address={new Address()}/>, document.getElementById('addressEntry'));
}

