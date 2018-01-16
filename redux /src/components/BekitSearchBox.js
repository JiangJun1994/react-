import React from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Input,
  Button
} from 'semantic-ui-react'
import styled from 'styled-components'
import throttle from 'lodash-es/throttle'
import { setSidebarVisibility } from '../actions/sidebar'
import BekitComponent from '../core/BekitComponent'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem;
  z-index: 9999;
`

class BekitSearchBox extends BekitComponent {

  constructor(props) {
    super(props)

    this.search = throttle(value => this.getBekit().search(value ? {
      q: value
    } : null, props.interval || 0, {
      trailing: false
    }))
  }

  render() {
    const { visible, toggleSidebar } = this.props

    return (
      <StyledHeader>
        <Grid divided textAlign="center">
          <Grid.Row color="blue">
            <Grid.Column>
              <Button toggle active={visible} icon="list layout" onClick={e => toggleSidebar(!visible)} />
            </Grid.Column>
            <Grid.Column width={15}>
              <Input fluid label="q=" icon="search" onChange={e => this.search(e.target.value)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyledHeader>
    )
  }
}

export default connect(state => state.sidebar, dispatch => ({
  toggleSidebar: visible => dispatch(setSidebarVisibility(visible))
}))(BekitSearchBox)
