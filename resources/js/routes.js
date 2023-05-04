import React from "react";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Confirmation from "./components/pages/Confirmation";
import Layout from "./components/Layout";
import Login from "./components/pages/Login";
import PainelLayout from "./components/dashboard/PainelLayout";
import ScrollToTop from "./components/common/ScrollToTop";
import Activity from "./components/pages/Activity";

export const history = createBrowserHistory();

function Routes() {
    const getRoute = (route) => {
        return "/" + localStorage.getItem("language") + route
    };

    return (

        <Router history={history}>
            <ScrollToTop>
                <Switch>

                    <Redirect exact from="/" to={getRoute("/")} />
                    <Redirect exact from="/contact" to={getRoute("/contact")} />
                    <Redirect exact from="/about" to={getRoute("/about")} />
                    <Redirect exact from="/confirmation/:token" to={getRoute("/confirmation/:token")} />
                    <Redirect exact from="/tour/:activity/:experience" to={getRoute("/tour/:activity/:experience")} />
                    <Route path="/login" component={Login} />
                    <Route path="/painel" component={PainelLayout} />

                    <Layout>
                        <Route exact path="/:language/confirmation/:token" component={withRouter(Confirmation)} />
                        <Route exact path="/:language/tour/:activity/:experience" component={withRouter(Activity)} />
                        <Route exact path="/:language/contact" component={Contact} />
                        <Route exact path="/:language/about" component={About} />
                        <Route exact path="/:language/" component={Homepage} />
                    </Layout>
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default Routes;
