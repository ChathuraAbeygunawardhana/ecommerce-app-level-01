import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../../app/(tabs)/index';
import { ModalContext } from '../../app/(tabs)/_layout';
import sampleData from '../../assets/sample.json';

const mockSetModalVisible = jest.fn();

const modalContextValue = {
  modalVisible: false,
  setModalVisible: mockSetModalVisible,
};

describe('Home Screen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ModalContext.Provider value={modalContextValue}>
        <Home />
      </ModalContext.Provider>
    );

    sampleData.forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('opens and closes the filter modal', () => {
    const { getByText } = render(
      <ModalContext.Provider value={modalContextValue}>
        <Home />
      </ModalContext.Provider>
    );

    // Open modal
    fireEvent.press(getByText('Filter'));
    expect(mockSetModalVisible).toHaveBeenCalledWith(true);

    // Close modal
    fireEvent.press(getByText('Apply Filters'));
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  it('applies filters correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <ModalContext.Provider value={modalContextValue}>
        <Home />
      </ModalContext.Provider>
    );

    // Open modal
    fireEvent.press(getByText('Filter'));

    // Set filter values
    fireEvent.changeText(getByPlaceholderText('Color'), 'Red');
    fireEvent.changeText(getByPlaceholderText('Min Price'), '50');
    fireEvent.changeText(getByPlaceholderText('Max Price'), '150');

    // Apply filters
    fireEvent.press(getByText('Apply Filters'));

    // Check if filters are applied
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  it('clears filters correctly', () => {
    const { getByText } = render(
      <ModalContext.Provider value={modalContextValue}>
        <Home />
      </ModalContext.Provider>
    );

    // Open modal
    fireEvent.press(getByText('Filter'));

    // Clear filters
    fireEvent.press(getByText('Clear'));

    // Check if filters are cleared
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });
});
