import React from 'react'
import {
  Icon,
  Accordion
} from 'semantic-ui-react'
import BekitComponent from '../core/BekitComponent'
import BekitFilterPane from './BekitFilterPane'
import BekitQueryPane from './BekitQueryPane'

export default class BekitOptions extends BekitComponent {

  state = {
    activeIndex: 0
  }

  accordions = [{
    title: 'Filter',
    content: <BekitFilterPane />
  }, {
    title: 'Query',
    content: <BekitQueryPane />
  }]

  render() {
    return (
      <Accordion fluid styled>
      {
        this.accordions.map((accordion, key) => [
          <Accordion.Title
            key={`accordion.title-${key}`}
            index={key}
            active={this.state.activeIndex === key}
            onClick={(e, props) => this.onClick(e, props)}>
            <Icon name="dropdown" />{this.T(accordion.title)}
          </Accordion.Title>,
          <Accordion.Content
            key={`accordion.content-${key}`}
            active={this.state.activeIndex === key}>
            {accordion.content}
          </Accordion.Content>
        ])
      }
      </Accordion>
    )
  }

  onClick(e, props) {
    this.setState({
      activeIndex: props.index === this.state.activeIndex ? -1 : props.index
    })
  }
}
