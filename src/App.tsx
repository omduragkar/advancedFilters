import './App.css'
import Dashboard from './components/Dashboard'
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
 return (
    <>
      <h1>business intelligence Dashboard</h1>
      <Provider store={store}>
        <Dashboard/>
      </Provider>
    </>
  )
}

export default App
