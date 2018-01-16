import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { updateCount } from '../actions/sidebar';

class Test extends React.Component {
    render() {
        return (
            <div>
                <input onChange={(e) => this.onChange(e)}></input>
                <p>{this.props.count}</p>
            </div>
        )
    }
    onChange(e) {
        this.props.updateCount(e.target.value)
    }
}




export default connect(state => state.sidebar, dispatch => ({
        updateCount: count => dispatch(updateCount(count))
    }))(Test);