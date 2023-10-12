import { FC, forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { inputStyles } from './styles';

export const Input: FC<TextInputProps> = forwardRef(
  ({ style, multiline, ...props }, ref) => {
    return (
      <TextInput
        {...(ref && ref)}
        style={[
          style,
          inputStyles.structure,
          !multiline && inputStyles.inputHeight,
        ]}
        {...props}
      />
    );
  },
);
