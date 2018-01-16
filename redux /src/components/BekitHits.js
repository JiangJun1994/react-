import React from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  Table,
  button
} from 'semantic-ui-react'
import styled from 'styled-components'
import get from 'lodash-es/get'
import BekitAccessor from '../core/BekitAccessor'
import BekitComponent from '../core/BekitComponent'
import BekitChart from './BekitChart'

const Hits = styled.section`
  margin-top: 1rem;
  overflow: 'scroll';
`
let total = []
total.length = Math.ceil(12345/10)
let a = []
for(var i=1;i<=total.length;i++){
  a.push(i)
}
const length = Math.ceil(12345/10)
console.log(a.length)

let start = 0
let end = 4

class BekitHits extends BekitComponent {

  constructor(props){
    super(props)
    this.state={
      pagination:a,
      next:1,
      prev:1,
      count:4,
      start:start,
      end:end
    }
  }

  componentWillMount() {
    const {pagination,next,prev,count,start,end} = this.state
    let show =pagination.slice(start,end)
    console.log(pagination)
    this.setState({
      panes: [{
        menuItem: this.T('Data'),
        render: () => (
          <Table celled>
            <Table.Header>
              <Table.Row>
              {
                this.props.fields.map((field, key) => (
                  <Table.HeaderCell key={key}>{field}</Table.HeaderCell>
                ))
              }
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {
              this.getHits().map((hit, key) => (
                <Table.Row key={key}>
                {
                  this.props.fields.map((field, index) => (
                    <Table.Cell key={index}>{get(hit, field, '').toString()}</Table.Cell>
                  ))
                }
                </Table.Row>
              ))
            }
            </Table.Body>

            <Table.Footer>
              <tr>
                <th colSpan="3">
                  <div class="ui right floated pagination menu">
                    <a class="icon item" data-key = {prev}><i class="left chevron icon"></i></a>
                    <a class="item" style={{display:"visible"}} data-key = {prev}>...</a>
                    {
                      show.map( (field) =>(
                        <a class="item" onClick={this.handleChange.bind(this)} data-key = {field} key={field}>{field}</a>
                      ))
                    }
                    <a class="item" data-key = {next} onClick={this.nextPage.bind(this)}>...</a>
                    <a class="icon item" data-key = {next}><i class="right chevron icon"></i></a>
                  </div>
                </th>
              </tr>
            </Table.Footer>

          </Table>
        )
      }, {
        menuItem: this.T('Chart'),
        render: () => <BekitChart />
      }]
    })
  }
  
  defineAccessor() {
    return new BekitAccessor(this, null, (result, options) => this.setState({
      panes: this.state.panes.concat(options.panes).filter(pane => pane && pane.menuItem && pane.render).map(pane => ({
        menuItem: pane.menuItem,
        render: () => <Hits>{pane.render()}</Hits>
      })),
      components: options.components,
      // total: result.hits.total
    }))
  }

  handleChange(e){
    let page = e.target.dataset.key
    this.getBekit().search({
      from: page * 10
    })
  }
  nextPage(e){
    this.setState(
      {
        start:start+4,
        end:end+4
      }
    ).then(console.log(this.state))
  }
  prepage(e){

  }

  render() {
    return this.state.components ? <Hits>{this.state.components}</Hits> : <Tab panes={this.state.panes} />
  }
}

// export default connect( (state) => {
//   return{
//     fields:state.sidebar,
//     total:state.total
//   }
// })(BekitHits)
export default connect(state =>{
  console.log("state",state)
    return (state.sidebar)
}
)(BekitHits)