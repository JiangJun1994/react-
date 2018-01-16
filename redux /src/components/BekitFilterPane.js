import React from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Input,
  Button,
  Dropdown
} from 'semantic-ui-react'
import get from 'lodash-es/get'
import map from 'lodash-es/map'
import keys from 'lodash-es/keys'
import { updateSidebar } from '../actions/sidebar'
import BekitComponent from '../core/BekitComponent'

class BekitFilterPane extends BekitComponent {

  state = {
    indices: [],
    types: [],
    source: []
  }

  activeIndex = null
  activeType = null

  componentWillMount() {
    const bekit = this.getBekit()

    bekit.cat.indices({
      format: 'json',
      h: ['index', 'docs.count']
    }).then(result => this.setState({
      indices: result.map(data => ({
        key: data.index,
        text: data.index,
        value: data.index
      }))
    }))
  }

  render() {
    const { indices, types, source } = this.state

    return (
      <Grid verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <p>_index</p>
            <Dropdown fluid search selection options={indices} onChange={(e, props) => this.onAddIndex(e, props)} />
          </Grid.Column>
          <Grid.Column width={8}>
            <p>_type</p>
            <Dropdown fluid search selection options={types} onChange={(e, props) => this.onAddType(e, props)} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p>_source</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Dropdown fluid search selection options={source} />
          </Grid.Column>
          <Grid.Column width={10} stretched>
            <Input />
          </Grid.Column>
          <Grid.Column width={2} textAlign="center" stretched>
            <Button>{this.T('Delete')}</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} stretched>
            <Button icon="plus" />
          </Grid.Column>
          <Grid.Column width={8} stretched>
            <Button primary>{this.T('Query')}</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  onAddIndex(e, props) {
    const index = props.value
    const bekit = this.getBekit()

    if (this.activeIndex !== index) {
      this.activeIndex = index

      bekit.indices.get({
        index,
        ignoreUnavailable: true
      }).then(result => this.setState({
        types: map(get(result[index], 'mappings', {
          properties: {}
        }), (value, type) => ({
          key: type,
          text: type,
          value: JSON.stringify({
            key: type,
            fields: keys(value.properties)
          })
        }))
      }))
      bekit.search({ index })
    }
  }

  onAddType(e, props) {
    const type = JSON.parse(props.value)

    if (this.activeType !== type.key) {
      this.activeType = type.key

      this.setState({
        source: type.fields.map(field => ({
          key: field,
          text: field,
          value: field
        }))
      }, () => this.props.updateSidebar(this.state.source.map(source => ({
        label: `_source.${source.text}`,
        checked: false
      }))))
      this.getBekit().search({
        index: this.activeIndex,
        type: type.key
      })
    }
  }
}

export default connect(null, dispatch => ({
  updateSidebar: source => dispatch(updateSidebar(source))
}))(BekitFilterPane)
