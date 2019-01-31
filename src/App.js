import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


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
    this.setState({
      [name]: value,
    }, function() {

      axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${this.state.yearvalue}`)
      .then(result => this.setState({ make: Object.values(result.data.menuItem) }))

      axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${this.state.yearvalue}&make=${this.state.makevalue}`)
       .then(result => this.setState({ model: Object.values(result.data.menuItem) }))

      axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/options?year=${this.state.yearvalue}&make=${this.state.makevalue}&model=${this.state.modelvalue}`)
       //.then(result => {if (result === "<menuItems/>") {console.log('ITS EMPTY')} })
       //.then(result => console.log(result.data.menuItem))
       .then(result => 
         
         this.setState({ 
           options: Object.values(result.data)
          })
         (console.log(result.data.menuItem.text))
          
        )
      var selectOptions;  
      //if (typeof this.state.options.menuItem.text !== 'undefined') {console.log('single')} else {console.log('double or empty')}}
      if ('text' in this.state.options.menuItem) {console.log('single')} else {console.log('double or empty')}}
  
      )
  }
 
  // {if (Array.isArray(this.state.options)) {console.log('is array')} else {console.log('not array')}}
    //   selectOptions = <LogoutButton />;
    // } else {
    //   selectOptions = <LoginButton />;
    // }

  render() {
    //console.log(this.state.year);
    var count = 0;

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
            
            {/* Add if statement for array vs object */}
            {/* <option>{selectOptions}</option> */}
            <option key={count+=1} value={this.state.options.text}>{this.state.options.text}</option>
            {/* {this.state.options.map(item =>(
              <option key={count+=1} value={item.value}>{item.text}</option>
            ))} */}

          </select>
        </label>    
      </form>
      
    );
  }
}

export default App;
