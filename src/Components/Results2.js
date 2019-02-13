import React, { Component } from 'react';
import '../App.css';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCarSide } from '@fortawesome/free-solid-svg-icons'
// library.add(faCarSide)

    
class Results2 extends Component {
    render() {
        return (
            <React.Fragment>
              
                <div className={this.props.clname}>
                    <div className="citympg">
                        City MPG: {this.props.city}
                    </div>
                    <div className="hwympg">
                        Highway MPG: {this.props.highway}               
                    </div>
                    <div className="combmpg">
                        Combined MPG: {this.props.combined}               
                    </div>
                    {/* <FontAwesomeIcon className="caricon" icon="car-side" /> */}
                    <div className = "gasicon">
                        <img height="40%" width="40%" src={"https://s3.amazonaws.com/pubfiles-kdupont.io/gas.svg"} alt=""/>
                    </div>
                    <div className ="annual">
                        Annual fuel cost (15k miles): ${this.props.cost}               
                    </div>
                    {/* <div className="close2" onClick={this.props.onClick}>X</div> */}
                </div>
                
            </React.Fragment>
        );
    }
}

export default Results2;
