import { FC } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { buttonStyles } from './styles';

interface IButtonProps extends PressableProps {
  label: string;
}

export const Button: FC<IButtonProps> = ({ label, ...props }) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        buttonStyles.container,
        pressed && buttonStyles.pressed,
      ]}>
      <Text style={buttonStyles.label}>{label}</Text>
    </Pressable>
  );
};
