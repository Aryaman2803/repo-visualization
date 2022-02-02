import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Wrapper from './Components/Wrapper'
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <Router>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/user/:username' element={<Wrapper />} />
      </Routes>
    </Router>
  </QueryClientProvider>,
  document.getElementById('root')
)
