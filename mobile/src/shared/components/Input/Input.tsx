import { FC, forwardRef } from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';
import { IInputProps } from './interface';
import { inputStyles } from './styles';

export const Input: FC<TextInputProps & IInputProps> = forwardRef(
  ({ style, multiline, errorMessage, ...props }, ref) => {
    return (
      <>
        <TextInput
          {...(ref && ref)}
          style={[
            style,
            inputStyles.structure,
            !multiline && inputStyles.inputHeight,
          ]}
          multiline
          {...props}
        />
        {errorMessage && <Text style={inputStyles.error}>{errorMessage}</Text>}
      </>
    );
  },
);
