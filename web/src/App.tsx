import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Bio } from './bio/Bio';

export class App extends React.Component<unknown, unknown> {
    render(): JSX.Element {
        const title = document.getElementsByTagName('title')[0];
        title.innerHTML = process.env.REACT_APP_SELF_FULLNAME || '';

        return (
            <Switch>
                <Route exact path="/">
                    <Bio />
                </Route>
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        );
    }
}
