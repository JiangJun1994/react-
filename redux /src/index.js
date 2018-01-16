import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import BekitProvider from './core/BekitProvider'
import App from './App'
import zhCN from './languages/zhCN'

// Elasticsearch配置选项
const options = {
  host: '192.168.0.21:9400'
}

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <BekitProvider options={options} translation={zhCN} searchOnLoad={true}>
      <App />
    </BekitProvider>
  </Provider>,
  document.getElementById('root')
)
