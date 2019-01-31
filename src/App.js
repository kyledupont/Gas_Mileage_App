import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var selectOptions;
var count = 0;

class App extends Component {

    state = {
      year: [],
      yearvalue: [],
      make: [],
      makevalue: [],
      model: [],
      modelvalue: [],
      options: [],
      optionsvalue: [],
    }

  

  componentDidMount() {
     axios.get('https://fueleconomy.gov/ws/rest/vehicle/menu/year')
       .then(result => this.setState({ year: Object.values(result.data.menuItem) }))
  }

 

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value)

    // Setting the value state of the current selection
    this.setState({
      [name]: value,
    }, function() {

      // Make API calls based on current selection value
      axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${this.state.yearvalue}`)
      .then(result => this.setState({ make: Object.values(result.data.menuItem) }))

      axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${this.state.yearvalue}&make=${this.state.makevalue}`)
       .then(result => this.setState({ model: Object.values(result.data.menuItem) }))

      axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/options?year=${this.state.yearvalue}&make=${this.state.makevalue}&model=${this.state.modelvalue}`)
    
      //Set options state, produce options based on results - could be blank, single object, or array of objects
       .then(result => this.setState({ options: result.data.menuItem}, function() {
          console.log(this.state.options, result.data.menuItem)
      
          if (Array.isArray(this.state.options)) {
            selectOptions = this.state.options.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))
          } else {
            selectOptions = <option key={count+=1} value={this.state.options.value}>{this.state.options.text}</option>
          }

        }))})
  }
 
  render() {
    console.log(this.state.options);
    
    return (
      <form>
        <label>
          <br/>Select Year<br/>
          <select id="year" name="yearvalue" defaultValue="--" onChange={this.handleChange}>
            <option key="--"> -- </option>
            {this.state.year.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))}
          </select>
        </label>
        <label>
          <br/>Select Make<br/>
          <select id="make" name="makevalue" defaultValue="--" onChange={this.handleChange}>
            <option key="--"> -- </option>
            {this.state.make.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))}
          </select>
        </label>
        <label>
          <br/>Select Model<br/>
          <select name="modelvalue" defaultValue="--" onChange={this.handleChange}>
            <option key="--"> -- </option>
            {this.state.model.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))}
          </select>
        </label>
        <label>
          <br/>Select Options<br/>
          <select name="optionsvalue" defaultValue="--" onChange={this.handleChange}>
            <option key="--"> -- </option>
            {selectOptions}
          </select>
        </label>    
      </form>
      
    );
  }
}

export default App;
