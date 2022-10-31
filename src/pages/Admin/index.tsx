import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import Products from "pages/Products";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import './styles.css';
import Users from "./Users";
const Admin = () => {

    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <Switch >
                    <PrivateRoute path="/admin/products">
                        <Products/>
                    </PrivateRoute>
                    <PrivateRoute path="/admin/categories">
                        <h1>Product categories</h1>
                    </PrivateRoute>
                    <PrivateRoute path="/admin/users" roles={['ROLE_ADMIN']}>
                        <Users/>
                    </PrivateRoute>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;