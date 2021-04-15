import React from "react";
import renderer from 'react-test-renderer';
import { MonoText } from '../../components/StyledText';
import { shallow } from 'enzyme';

describe('StyledText', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<MonoText />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should have space-mono fontFamily', () => {
        const spaceMonoStyle = {
            fontFamily: 'space-mono'
        };

        const component = renderer.create(<MonoText />);
        expect(component.props.style).toMatchObject(spaceMonoStyle);
    });
})
