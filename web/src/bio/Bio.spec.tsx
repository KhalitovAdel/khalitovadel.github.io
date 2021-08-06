import renderer from 'react-test-renderer';

import { Bio } from './Bio';

describe('Bio', () => {
    it('should render correct', () => {
        const tree = renderer.create(<Bio />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
