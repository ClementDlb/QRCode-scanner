import React from 'react';
import { render, fireEvent } from "@testing-library/react-native";

import App from "../../screens/TabTwoScreen";

it('renders default element', () => {
   const { getAllByText } = render(<App />);

   expect(getAllByText('App').length).toBe(2);
});

it('shows invalid messages', () => {
   const { getByTestId, getByText } = render(<App />);

   fireEvent.press(getByTestId('App.Button'));
});

// Tester la fonction retrieveData
// Tester la fonction deleteData
// Tester l'évènement click du bouton deleteData
// Tester l'évènement rafraichissement retrieveData
