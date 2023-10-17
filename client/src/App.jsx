import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/Dashboard.jsx';
import Layout from './scenes/Layout.jsx';
import Products from './scenes/Products.jsx';
import Customers from './scenes/Customers.jsx';
import Transactions from './scenes/Transactions.jsx';
import Geography from './scenes/Geography.jsx';
import Overview from './scenes/Overview.jsx';
import Daily from './scenes/Daily.jsx';
<<<<<<< HEAD
import Monthly from './scenes/Monthly.jsx';
import Breakdown from './scenes/Breakdown.jsx';
=======
>>>>>>> origin/main

/**
 * Renders the main App component.
 * @returns {JSX.Element} The App component.
 */
const App = () => {
<<<<<<< HEAD

=======
  
>>>>>>> origin/main
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>

            <Route element={<Layout />}>

              <Route path="/" element={<Navigate to='/dashboard' replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
<<<<<<< HEAD
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
=======
              <Route path = "/daily" element = {<Daily />} />

>>>>>>> origin/main
            </Route>

          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App