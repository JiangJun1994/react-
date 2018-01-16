import React from 'react'
import { connect } from 'react-redux'
import BekitAccessor from '../core/BekitAccessor'
import BekitComponent from '../core/BekitComponent'
import { updateTotal } from '../actions/sidebar'

 class BekitHitStats extends BekitComponent {

  state = {
    took:null,
    total:null
  }

  defineAccessor() {
    return new BekitAccessor(this, null, result => this.setState({
      took: result.took,
      total: result.hits.total
    }))
  }

  render() {
    const { took, total } = this.state

    return <p>找到 {total} 条结果，耗时 {took} 毫秒</p>
  }
}

export default connect(null, dispatch => ({
  updateTotal: total => dispatch(updateTotal(total))
}))(BekitHitStats)
