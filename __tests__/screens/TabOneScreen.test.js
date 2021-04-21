import React from 'react';
import { render, fireEvent } from "@testing-library/react-native";

import TabOneScreen from '../../screens/TabTwoScreen';

it('renders default element', () => {
   render(<TabOneScreen />);
});
