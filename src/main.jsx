import ReactDOM from 'react-dom/client'
import App from './pages/App/index.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import es from './translations/es/es.json'
import en from './translations/en/en.json'
import { GeneralProvider } from './context/general.jsx'

i18next.use(initReactI18next).init({
  lng: localStorage.getItem('lng') || "es",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: {
      translation: es,
    },
    en: {
      translation: en,
    }
  }

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <I18nextProvider>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </I18nextProvider>
  </BrowserRouter>
)
