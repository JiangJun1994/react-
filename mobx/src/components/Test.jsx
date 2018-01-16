import React from 'react';
import SimpleHoc from './SimpleHoc'

class Usual extends SimpleHoc {
    constructor(props){
        super(props)

    }
    componentWillMount(){
        console.log('props',this.props)
    }

    render(){
        return (
            <div>
                <p>usual</p>
            </div>
        )
    }
}

export default Usual