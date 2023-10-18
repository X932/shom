import { FC } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { buttonStyles } from './styles';

interface IButtonProps extends PressableProps {
  label: string;
  variant?: keyof Pick<typeof buttonStyles, 'primary' | 'outline'>;
}

export const Button: FC<IButtonProps> = ({
  label,
  variant = 'primary',
  disabled,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        buttonStyles.container,
        pressed && buttonStyles.pressed,
        buttonStyles[variant],
        disabled && buttonStyles.disabled,
      ]}>
      <Text style={[buttonStyles[variant], buttonStyles.label]}>{label}</Text>
    </Pressable>
  );
};
