import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as React from 'react';
import { App } from './App';
import { NotFound } from './components/NotFound';

export const Router: React.SFC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

Router.displayName = 'Router';
