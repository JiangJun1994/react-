import React from 'react'
import { connect } from 'react-redux'
import {
  List,
  Sidebar,
  Checkbox
} from 'semantic-ui-react'
import styled from 'styled-components'
import { updateHitFields } from '../actions/sidebar'
import BekitComponent from '../core/BekitComponent'

const StyledAside = styled.aside`
  background: #e8e8e8;
  padding-right: 1rem;
`
const StyledHeader = styled.p`
  margin: 0;
  padding-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #e8e8e8;
`
const StyledContent = styled.div`
  height: 100%;
  padding: 1rem;
  background: white;
`
const StyledCheckbox = styled(Checkbox)`
  padding-bottom: .5em;
`

class BekitSidebar extends BekitComponent {

  fields = [{
    label: '_index',
    checked: true
  }, {
    label: '_type',
    checked: true
  }, {
    label: '_id',
    checked: true
  }, {
    label: '_score',
    checked: false
  }]

  componentWillMount() {
    this.props.updateHitFields(this.fields.filter(field => field.checked).map(field => field.label))
  }

  render() {
    const { visible, source } = this.props

    return (
      <Sidebar as={StyledAside} animation="slide along" width="wide" vertical visible={visible}>
        <StyledContent>
          <StyledHeader>{this.T('All Fields')}</StyledHeader>
          <List>
          {
            this.fields.concat(source).map((field, key, fields) => (
              <List.Item key={key}>
                <StyledCheckbox
                  label={field.label}
                  defaultChecked={field.checked}
                  onChange={(e, props) => this.onChange(e, props, key, fields)} />
              </List.Item>
            ))
          }
          </List>
        </StyledContent>
      </Sidebar>
    )
  }

  onChange(e, props, key, fields) {
    fields[key].checked = props.checked
    this.props.updateHitFields(fields.filter(field => field.checked).map(field => field.label))
  }
}

BekitSidebar.defaultProps = {
  visible: false,
  source: []
}

export default connect(state => state.sidebar, dispatch => ({
  updateHitFields: fields => dispatch(updateHitFields(fields))
}))(BekitSidebar)
