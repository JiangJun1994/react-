import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash-es/get'
import noop from 'lodash-es/noop'
import cloneDeep from 'lodash-es/cloneDeep'
import BekitManager from './BekitManager'

export default class BekitComponent extends React.Component {

  static contextTypes = {
    bekit: PropTypes.instanceOf(BekitManager).isRequired
  }

  name = Math.random().toString(16).substring(2)

  constructor(props) {
    super(props)

    this.componentWillMount = ((componentWillMount = noop) => () => {
      this.getBekit().addAccessor(this.defineAccessor())
      componentWillMount.call(this)
    })(this.componentWillMount)
  }

  getBekit() {
    return this.context.bekit
  }

  defineAccessor() {
    return null
  }

  T(text, scope) {
    return this.getBekit().translate(text, scope)
  }

  getHits() {
    const bekit = this.getBekit()

    if (get(bekit, 'result.found', false)) {
      return cloneDeep([bekit.result])
    }

    return get(bekit, 'result.hits.hits', [])
  }

  getBuckets(name = this.name) {
    return get(this.getBekit(), `result.aggregations.${name}.buckets`, [])
  }
}
