import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash-es/isFunction'
import elasticsearch from 'elasticsearch-browser'
import BekitManager from './BekitManager'

export default class BekitProvider extends React.Component {

  static childContextTypes = {
    bekit: PropTypes.instanceOf(BekitManager).isRequired
  }

  static propTypes = {
    options: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    translation: PropTypes.object,
    searchOnLoad: PropTypes.bool
  }

  constructor(props) {
    super(props)

    const manager = new BekitManager(props.translation)
    const elastic = new elasticsearch.Client(props.options)

    this.manager = new Proxy(manager, {
      get: (target, name) => {
        if (Reflect.has(target, name)) {
          return target[name]
        }

        return isFunction(elastic[name]) ? (...args) => elastic[name](...args)
          .then(result => target.setResult(result)) : elastic[name]
      }
    })
  }

  getChildContext() {
    return {
      bekit: this.manager
    }
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    if (this.props.searchOnLoad) {
      this.manager.search()
    }
  }
}
