import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Results from  './Components/Results';
import Results2 from  './Components/Results2';

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
      shouldHide1: true,
      shouldHideForm2: true,
      shouldHide2: true,
      shouldHideAdd: false,
      year2: [],
      yearvalue2: [],
      make2: [],
      makevalue2: [],
      model2: [],
      modelvalue2: [],
      selectModel2: "",
      options2: [],
      optionsvalue2: [],
      selectOptions2: "",
      selectionResults2: [],
    }

  
  componentDidMount() {
     axios.get('https://fueleconomy.gov/ws/rest/vehicle/menu/year')
       .then(result => this.setState({ 
         year: Object.values(result.data.menuItem),
         year2: Object.values(result.data.menuItem),
        }))
  }

  onSubmit = (e) => {
    this.setState({shouldHide1: false})
    e.preventDefault();
    axios.get(`https://fueleconomy.gov/ws/rest/vehicle/${this.state.optionsvalue}`)
    .then(result => Object.values(result))
    .then(result => this.setState({selectionResults: result[0]} )) 
  }

  onSubmit2 = (e) => {
    this.setState({shouldHide2: false})
    e.preventDefault();
    axios.get(`https://fueleconomy.gov/ws/rest/vehicle/${this.state.optionsvalue2}`)
    .then(result => Object.values(result))
    .then(result => this.setState({selectionResults2: result[0]} )) 
  }

  onSubmitAdd = (e) => {
    this.setState({
      shouldHideAdd: true,
      shouldHideForm2: false,
    })
  }

  onClose = (e) => {
    this.setState({
      shouldHideForm2: true,
      shouldHide2: true,
      shouldHideAdd: false,
    })
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

      else if (name === 'yearvalue2') {
        console.log('name === yearvalue2')
        this.setState({
          make2: [],
          model2: [],
          selectModel2: "",
          options2: [],
          selectOptions2: ""
        })
        axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${this.state.yearvalue2}`)
        .then(result => this.setState({ make2: Object.values(result.data.menuItem) }))
      }

      // GET Model
      else if (name === 'makevalue') {
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

      else if (name === 'makevalue2') {
        console.log('name === makevalue2')
        this.setState({
          model2: [],
          selectModel2: "",
          options2: [],
          selectOptions2: ""
        })
        axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${this.state.yearvalue2}&make=${this.state.makevalue2}`)
        .then(result => this.setState({ model2: result.data.menuItem }, function() {
          
          if (Array.isArray(this.state.model2)) {
            this.setState({ selectModel2: this.state.model2.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))})
            } else  {
            const v = this.state.model2.value
            const t = this.state.model2.text
            this.setState({ 
            selectModel2: <option key={1} value={v}>{t}</option>
            })}
          }))
        }

      // GET Options
      else if (name === 'modelvalue') {
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
      

      else if (name === 'modelvalue2') {
        console.log('name === modelvalue2')
        this.setState({
          options2: [],
          selectOptions2: ""
        })
        axios.get(`https://fueleconomy.gov/ws/rest/vehicle/menu/options?year=${this.state.yearvalue2}&make=${this.state.makevalue2}&model=${this.state.modelvalue2}`)
        //Set options state, produce options based on results - could be blank, single object, or array of objects
        .then(result => this.setState({ options2: result.data.menuItem}, function() {

          if (Array.isArray(this.state.options2)) {
            this.setState({ selectOptions2: this.state.options2.map(item =>(
              <option key={item.text} value={item.value}>{item.text}</option>
            ))})
            } else  {
            const v = this.state.options2.value
            const t = this.state.options2.text
            this.setState({ 
            selectOptions2: <option key={2} value={v}>{t}</option>
            })}

          }))
        }
      else {}
      })
      
  }

 
  render() {
    const { city08, highway08, comb08, fuelCost08 } = this.state.selectionResults;
    
    return (
      <React.Fragment>
        <header>
          <div className="title">MPG Comparer</div>
        </header>
        <div className="body">
          <form className="form">
            <label>
              <br/>Select Year<br/>
              <select id="year" name="yearvalue" defaultValue="--" onChange={this.handleChange} >
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
            <button className="submit" name="select" onClick={this.onSubmit}>Show me the numbers!</button> 
          </form>
          <Results clname={this.state.shouldHide1 ? 'hidden' : 'databox'} key="3" city={city08} highway={highway08} combined={comb08} cost={fuelCost08}/>
          <form className={this.state.shouldHideForm2 ? 'hidden' : 'form2'}>
            <label className="year">
              <br/>Select Year<br/>
              <select id="year2" name="yearvalue2" defaultValue="--" onChange={this.handleChange}>
                <option disabled key="--" value="--"> -- </option>
                {this.state.year2.map(item =>(
                  <option key={item.text} value={item.value}>{item.text}</option>
                ))}
              </select>
            </label>
            <label>
              <br/>Select Make<br/>
              <select id="make2" name="makevalue2" defaultValue="--" onChange={this.handleChange}>
                <option key="--" value="--"> -- </option>
                {this.state.make2.map(item =>(
                  <option key={item.text} value={item.value}>{item.text}</option>
                ))}
              </select>
            </label>
            <label>
              <br/>Select Model<br/>
              <select name="modelvalue2" defaultValue="--" onChange={this.handleChange}>
                <option key="--" value="--"> -- </option>
                {this.state.selectModel2}
              </select>
            </label>
            <label>
              <br/>Select Options<br/>
              <select name="optionsvalue2" defaultValue="--" onChange={this.handleChange}>
                <option key="--" value="--"> -- </option>
                {this.state.selectOptions2}
              </select>
            </label>
            <button className="submit2" name="select2" onClick={this.onSubmit2}>Show me the numbers!</button> 
            <div className="close" onClick={this.onClose}>X</div>
          </form>
          <Results2 clname={this.state.shouldHide2 ? 'hidden' : 'databox2'} key={this.state.optionsvalue2} city={this.state.selectionResults2.city08} highway={this.state.selectionResults2.highway08} combined={this.state.selectionResults2.comb08} cost={this.state.selectionResults2.fuelCost08}/>
          <div className={this.state.shouldHideAdd ? 'hidden' : 'add' } onClick={this.onSubmitAdd}>+</div>
        </div>
        <footer>
          <div>© Kyle Dupont 2019</div>
        </footer>
      </React.Fragment>
      
    );
  }
}

export default App;
