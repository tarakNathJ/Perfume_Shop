import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import Router from './Routes/Route.jsx'
import {Provider} from 'react-redux'
import {store} from './Redux/Store.jsx'

createRoot(document.getElementById('root')).render(
	<Provider store={store} >
		<RouterProvider router={Router}>

		</RouterProvider>
	</Provider>
)
