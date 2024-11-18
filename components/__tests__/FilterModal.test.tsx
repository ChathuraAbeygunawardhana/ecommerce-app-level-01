import React from 'react';
import renderer from 'react-test-renderer';
import FilterModal from '../Home/FilterModal';

describe('FilterModal', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FilterModal
        uniqueColors={['Red', 'Blue']}
        brand="Nike"
        setBrand={() => {}}
        color="Red"
        setColor={() => {}}
        minPrice="0"
        setMinPrice={() => {}}
        maxPrice="100"
        setMaxPrice={() => {}}
        applyFilters={() => {}}
        clearFilters={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});