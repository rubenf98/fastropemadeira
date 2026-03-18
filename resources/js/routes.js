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
import PartnerForm from "./components/pages/PartnerForm";

export const history = createBrowserHistory();

function Routes() {

    return (

        <Router history={history}>
            <ScrollToTop>
                <Switch>

                    <Route path="/login" component={Login} />
                    <Route path="/painel" component={PainelLayout} />

                    <Layout>
                        <Route exact path="/reservation/:partnerUrl" component={withRouter(PartnerForm)} />
                        <Route exact path="/confirmation/:token" component={withRouter(Confirmation)} />
                        <Route exact path="/tour/:activity/:experience" component={withRouter(Activity)} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/" component={Homepage} />
                    </Layout>
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default Routes;
