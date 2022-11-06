import React from 'react'
import GlobalStyles from 'styles/GlobalStyles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AgencyLandingPage from 'demos/AgencyLandingPage'

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path='/' element={<AgencyLandingPage />} />
        </Routes>
      </Router>
    </>
  )
}
