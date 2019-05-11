import * as React from 'react';

import { shallow } from 'enzyme';
import { App } from '../src/App';

describe('App component', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render matches page', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('MatchesPage').exists()).toBe(true);
    });
})