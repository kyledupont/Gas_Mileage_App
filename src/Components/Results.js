import React, { Component } from 'react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'

library.add(faCarSide)

    
class Results extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="databox">
                    <div>
                        City MPG = {this.props.city}
                    </div>
                    <div>
                        Highway MPG = {this.props.highway}               
                    </div>
                    <div>
                        Combined MPG = {this.props.combined}               
                    </div>
                    <FontAwesomeIcon icon="car-side" />
                    <div>
                        Annual fuel cost 15k miles = {this.props.cost}               
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Results;
