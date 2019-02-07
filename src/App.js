import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Results from  './Components/Results';

class App extends Component {

    state = {
      year: [],
      yearvalue: [],
      make: [],
      makevalue: [],
      model: [],
      modelvalue: [],
      selectModel: "",
      options: [],
      optionsvalue: [],
      selectOptions: "",
      selectionResults: [],
    }

  
  componentDidMount() {
     axios.get('https://fueleconomy.gov/ws/rest/vehicle/menu/year')
       .then(result => this.setState({ year: Object.values(result.data.menuItem) }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://fueleconomy.gov/ws/rest/vehicle/${this.state.optionsvalue}`)
    .then(result => Object.values(result))
    .then(result => this.setState({selectionResults: result[0]} ))
    //.then(result => JSON.stringify(result.data,null,4))
    //.then(result => console.log(result[0].city08))
    //.then(result => this.setState({ selectionResults: result }))
    
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
      // GET Make
      if (name === 'yearvalue') {
        console.log('name === yearvalue')
        this.setState({
          make: [],
          model: [],
          selectModel: "",
          options: [],
          selectOptions: ""
        })
        axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${this.state.yearvalue}`)
        .then(result => this.setState({ make: Object.values(result.data.menuItem) }))
      }
      // GET Model
      if (name === 'makevalue') {
        console.log('name === makevalue')
        this.setState({
          model: [],
          selectModel: "",
          options: [],
          selectOptions: ""
        })
        axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${this.state.yearvalue}&make=${this.state.makevalue}`)
        .then(result => this.setState({ model: result.data.menuItem }, function() {
          
          if (Array.isArray(this.state.model)) {
            this.setState({ selectModel: this.state.model.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))})
            } else  {
            const v = this.state.model.value
            const t = this.state.model.text
            this.setState({ 
            selectModel: <option key={1} value={v}>{t}</option>
            })}
          }))
        }
      // GET Options
      if (name === 'modelvalue') {
        console.log('name === modelvalue')
        this.setState({
          options: [],
          selectOptions: ""
        })
        axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/options?year=${this.state.yearvalue}&make=${this.state.makevalue}&model=${this.state.modelvalue}`)
        //Set options state, produce options based on results - could be blank, single object, or array of objects
        .then(result => this.setState({ options: result.data.menuItem}, function() {

          if (Array.isArray(this.state.options)) {
            this.setState({ selectOptions: this.state.options.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))})
            } else  {
            const v = this.state.options.value
            const t = this.state.options.text
            this.setState({ 
            selectOptions: <option key={1} value={v}>{t}</option>
            })}

          }))
        }
      })
      
  }

 
  render() {
    const { city08, highway08, comb08, fuelCost08 } = this.state.selectionResults;

    return (
      <React.Fragment>
        <form>
          <label>
            <br/>Select Year<br/>
            <select id="year" name="yearvalue" defaultValue="--" onChange={this.handleChange}>
              <option disabled key="--" value="--"> -- </option>
              {this.state.year.map(item =>(
                <option key={item.text} value={item.value}>{item.text}</option>
              ))}
            </select>
          </label>
          <label>
            <br/>Select Make<br/>
            <select id="make" name="makevalue" defaultValue="--" onChange={this.handleChange}>
              <option key="--" value="--"> -- </option>
              {this.state.make.map(item =>(
                <option key={item.text} value={item.value}>{item.text}</option>
              ))}
            </select>
          </label>
          <label>
            <br/>Select Model<br/>
            <select name="modelvalue" defaultValue="--" onChange={this.handleChange}>
              <option key="--" value="--"> -- </option>
              {this.state.selectModel}
            </select>
          </label>
          <label>
            <br/>Select Options<br/>
            <select name="optionsvalue" defaultValue="--" onChange={this.handleChange}>
              <option key="--" value="--"> -- </option>
              {this.state.selectOptions}
            </select>
          </label>    
        </form>
        <div>
          <button name="select" onClick={this.onSubmit}>Select</button>
        </div>
        <div>
          {/* <Results city={city08}/> */}
          <Results key={this.state.optionsvalue} city={city08} highway={highway08} combined={comb08} cost={fuelCost08}/>
        </div>
      </React.Fragment>
      
    );
  }
}

export default App;
