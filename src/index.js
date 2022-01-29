import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
