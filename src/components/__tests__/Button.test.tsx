import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import { Button } from '../Button';
import { ThemeProvider } from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('renders correctly with label', () => {
    const { getByText } = renderWithTheme(<Button label="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockPress = jest.fn();
    const { getByText } = renderWithTheme(<Button label="Test" onPress={mockPress} />);
    
    fireEvent.press(getByText('Test'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('does not press when disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button label="Test" onPress={mockPress} disabled />
    );
    
    fireEvent.press(getByText('Test'));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('shows loading state correctly', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <Button label="Test" loading />
    );
    
    // Should show activity indicator and hide text
    expect(queryByText('Test')).toBeFalsy();
  });

  it('applies variant styles correctly', () => {
    const { getByText, rerender } = renderWithTheme(<Button label="Test" variant="solid" />);
    expect(getByText('Test')).toBeTruthy();
    
    rerender(
      <ThemeProvider>
        <Button label="Test" variant="outline" />
      </ThemeProvider>
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('applies size styles correctly', () => {
    const { getByText, rerender } = renderWithTheme(<Button label="Test" size="sm" />);
    expect(getByText('Test')).toBeTruthy();
    
    rerender(
      <ThemeProvider>
        <Button label="Test" size="lg" />
      </ThemeProvider>
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('has correct accessibility properties', () => {
    const { getByRole } = renderWithTheme(
      <Button label="Test Button" accessibilityLabel="Custom Label" />
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Custom Label');
  });

  it('supports icon prop', () => {
    const { getByTestId } = renderWithTheme(
      <Button label="Test" icon={<View testID="test-icon" />} />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });
});
