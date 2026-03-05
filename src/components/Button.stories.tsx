import { View } from 'react-native';
import { Button } from './Button';
import { ThemeProvider } from '../theme/ThemeContext';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} as const;

export default meta;

export const Default = {
  args: {
    label: 'Button',
  },
};

export const Solid = {
  args: {
    variant: 'solid',
    label: 'Solid Button',
  },
};

export const Outline = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost = {
  args: {
    label: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    label: 'Delete',
  },
};

export const Small = {
  args: {
    label: 'Small Button',
    size: 'sm',
  },
};

export const Large = {
  args: {
    label: 'Large Button',
    size: 'lg',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
  },
};

export const Loading = {
  args: {
    loading: true,
    label: 'Loading',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    label: 'Full Width Button',
  },
};

export const WithIcon = {
  args: {
    label: 'With Icon',
    icon: '🚀',
  },
};
