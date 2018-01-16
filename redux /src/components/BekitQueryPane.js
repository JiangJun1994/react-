import React from 'react'
import {
  Form
} from 'semantic-ui-react'
import BekitComponent from '../core/BekitComponent'

export default class BekitQueryPane extends BekitComponent {

  render() {
    return (
      <Form>
        <Form.TextArea />
        <Form.Button>{this.T('Query')}</Form.Button>
      </Form>
    )
  }
}
