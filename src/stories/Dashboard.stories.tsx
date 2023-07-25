import { Provider } from "react-redux";
import Dashboard from "../components/Dashboard";
import store from "../redux/store";

export default {
    title:"Components/Dashboard",
    component: Dashboard,
}

export const mainDashboard = ()=> (
<Provider store={store}>
    <Dashboard />
</Provider>); 