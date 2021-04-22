import React from 'react';
import renderer from 'react-test-renderer';
import { Alert } from 'react-native';
import PromoItem from '../../components/PromoItem/PromoItem'
import { render, cleanup, fireEvent } from '@testing-library/react-native';

afterEach(cleanup);

describe('<PromoItem />', () => {
    it('snapshotPromoItem', () => {
        const renderered = render(<PromoItem nom="test" montant={50} expireAt='24/01/2021' code="HIVER33"></PromoItem>).toJSON();
        expect(renderered).toMatchSnapshot();
    });

    it('doit rendre le nom correctement', () => {
        const rendered = render(<PromoItem nom="test"></PromoItem>);
        const textComponent = rendered.getByTestId('Nomtext')

        expect(textComponent.props.children).toEqual('test');
    });

    it('doit rendre le montant correctement', () => {
        const rendered = render(<PromoItem montant={50}></PromoItem>);
        const textComponent = rendered.getByTestId('Montanttext')

        expect(textComponent.props.children).toEqual([50, "%"]);
    });

    it("doit rendre la date d'expiration correctement", () => {
        const rendered = render(<PromoItem expireAt="24/01/2021"></PromoItem>);
        const textComponent = rendered.getByTestId('ExpireAttext')

        expect(textComponent.props.children).toEqual('24/01/2021');
    });

    it("doit alert le code onPress", () => {
        jest.spyOn(Alert, 'alert')
        const rendered = render(<PromoItem code="HIVER33"></PromoItem>);
        const buttonComponent = rendered.getByTestId('AlertCodeButton')
        fireEvent(buttonComponent, 'press');

        expect(Alert.alert).toHaveBeenCalledWith("HIVER33")
    });


})