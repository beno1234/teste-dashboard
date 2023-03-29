import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Englobador>
      
    <Provider store={store}>
      <Layout />
    <Component {...pageProps} />
    </Provider>
    </Englobador>
  )

}

const Englobador = ({children}: {children: any}) => {
  return (
    <div>{children }</div>
  )
}
