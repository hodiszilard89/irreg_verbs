import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import MagneticDndExample from './pages/example.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ChakraProvider value={defaultSystem}> 
     <App></App>
    </ChakraProvider>
  </StrictMode>,
)
