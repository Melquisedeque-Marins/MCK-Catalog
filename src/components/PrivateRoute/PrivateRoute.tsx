import { Redirect, Route } from "react-router-dom";
import { hasAnyHoles, isAuthenticated, Role } from "util/auth";

type Props = {
    children: React.ReactChild;
    path: string;
    roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] } : Props ) => {
    return (
       <Route 
            path={path} 
            render={({ location }) => 
                !isAuthenticated() ? (
                    <Redirect to={{
                        pathname: '/admin/auth/login',
                        state: { from: location },
                    }}
                />
                ) : !hasAnyHoles(roles) ? (
                    <Redirect to="/admin/products" />
                ) : (
                    children
                )
            }
            />
    );
}
export default PrivateRoute