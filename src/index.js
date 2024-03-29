import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Wrapper from './Components/Wrapper'
import Error from './Components/Error/error'
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/user/:username' element={<Wrapper />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>,
  document.getElementById('root')
)
