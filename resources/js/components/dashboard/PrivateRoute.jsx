import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";


export const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => {
    return (
        !loading && (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        )
    );
};





function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading
    };
}

export default connect(mapStateToProps)(PrivateRoute);