import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider} from 'react-redux'
import store from '../redux/store'
import { CssBaseline } from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <Provider store={store}>
        <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  )

}

