import React from 'react';
import renderer from 'react-test-renderer';
import CheckoutButton from '../Cart/CheckoutButton';

describe('CheckoutButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CheckoutButton onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});