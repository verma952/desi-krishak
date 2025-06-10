import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './components/context/AuthContext.jsx'
import  {SearchProvider}  from './components/context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
         <App />
      </SearchProvider>
    </AuthProvider>
  </StrictMode>,
)
