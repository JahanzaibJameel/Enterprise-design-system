import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';

// Simple mock Button component for testing
interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: string;
  size?: string;
  accessibilityLabel?: string;
  icon?: React.ReactNode;
}

const Button = ({ label, onPress, disabled, loading, variant = 'solid', size = 'md', accessibilityLabel, icon }: ButtonProps) => {
  return (
    <TouchableOpacity
      testID="button"
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
    >
      {loading ? (
        <View testID="loading-indicator" />
      ) : (
        <View>
          {icon}
          <Text>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

describe('Button', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(<Button label="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<Button label="Test" onPress={mockPress} />);
    
    fireEvent.press(getByText('Test'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('does not press when disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<Button label="Test" onPress={mockPress} disabled />);
    
    fireEvent.press(getByText('Test'));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('shows loading state correctly', () => {
    const { getByTestId, queryByText } = render(<Button label="Test" loading />);
    
    // Should show activity indicator and hide text
    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(queryByText('Test')).toBeFalsy();
  });

  it('has correct accessibility properties', () => {
    const { getByRole } = render(
      <Button label="Test Button" accessibilityLabel="Custom Label" />
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Custom Label');
  });

  it('supports icon prop', () => {
    const { getByTestId } = render(
      <Button label="Test" icon={<View testID="test-icon" />} />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });
});
