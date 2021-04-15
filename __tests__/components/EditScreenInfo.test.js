import React from "react";
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import EditScreenInfo from '../../components/EditScreenInfo';

describe('EditScreenInfo', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<EditScreenInfo  path={}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should have path param', () => {
        const component = shallow(<EditScreenInfo />);

        expect(component.props.path)
    });
});
