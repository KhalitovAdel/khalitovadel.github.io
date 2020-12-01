import React from 'react';
import { Bio } from './bio/Bio';
import { Switch, Route, Redirect } from 'react-router-dom';
export class App extends React.Component<any, any> {
    render() {
        const title = document.getElementsByTagName('title')[0] || ({} as any);
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
