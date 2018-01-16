import React from 'react'
import {
  Sidebar,
  Segment
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'
import BekitSearchBox from './components/BekitSearchBox'
import BekitSidebar from './components/BekitSidebar'
import BekitOptions from './components/BekitOptions'
import BekitHitStats from './components/BekitHitStats'
import BekitHits from './components/BekitHits'
import Test from './components/Test'

const StyledRoot = styled.div`
  height: 100%;
  overflow: scroll;
  background: #e8e8e8;
`
const StyledContent = styled.div`
  margin-top: 6rem;
`

export default () => (
  <StyledRoot>
    <Test></Test>
    {/* <BekitSearchBox />
    <StyledContent>
      <Sidebar.Pushable as={Segment}>
        <BekitSidebar />
        <Sidebar.Pusher>
          <Segment basic>
            <BekitOptions />
          </Segment>
          <Segment basic>
            <BekitHitStats />
            <BekitHits />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </StyledContent> */}
  </StyledRoot>
)
