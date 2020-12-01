import React from 'react';
import { Bio } from './bio/Bio';

export class App extends React.Component<any, any> {
    render() {
        const title = document.getElementsByTagName('title')[0] || ({} as any);
        title.innerHTML = process.env.REACT_APP_SELF_FULLNAME || '';
        return (
            <div className="App">
                <Bio />
            </div>
        );
    }
}
