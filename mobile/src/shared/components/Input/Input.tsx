import { Dispatch, SetStateAction } from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';
import { isInputValid } from '@utils';
import { inputStyles } from './styles';
import { IInput } from './interface';

interface IInputProps<T> extends TextInputProps {
  formData: Record<keyof T, IInput>;
  setFormData: Dispatch<SetStateAction<Record<keyof T, IInput>>>;
  label?: string;
  inputKey: keyof T;
}

export const Input = <T,>({
  inputKey,
  label,
  formData,
  setFormData,
  style,
  multiline,
  ...props
}: IInputProps<T>) => {
  const onChangeHandler = (key: keyof T, value: string): void => {
    const isValid = isInputValid({
      value: value,
      regexp: formData[key].regexp,
    });

    if (isValid) {
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          value: value,
          isTouched: true,
          isValid: isValid,
        },
      });
    }
  };

  const onPressOutHandler = (key: keyof T): void => {
    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        isTouched: true,
        isActive: true,
      },
    });
  };

  const onBlurHandler = (key: keyof T): void => {
    const inputValue = formData[key].value;

    const isValid = isInputValid({
      value: inputValue,
      regexp: formData[key].regexp,
      exactLength: formData[key].exactLength,
      maxLength: formData[key].maxLength,
      minLength: formData[key].minLength,
    });

    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        isValid: isValid,
        isActive: false,
      },
    });
  };

  const getStylesByValidity = (): Record<string, string> | undefined => {
    if (!formData[inputKey].isTouched) {
      return inputStyles.default;
    } else if (formData[inputKey].isActive) {
      return inputStyles.active;
    } else if (formData[inputKey].isValid) {
      return inputStyles.success;
    } else if (!formData[inputKey].isValid) {
      return inputStyles.error;
    }
  };

  return (
    <>
      <Text style={[style, inputStyles.label, getStylesByValidity()]}>
        {label}
      </Text>
      <TextInput
        onChangeText={text => onChangeHandler(inputKey, text)}
        onPressOut={() => onPressOutHandler(inputKey)}
        onBlur={() => onBlurHandler(inputKey)}
        value={formData[inputKey].value}
        maxLength={formData[inputKey].exactLength}
        style={[
          style,
          inputStyles.structure,
          getStylesByValidity(),
          !multiline && inputStyles.inputHeight,
        ]}
        {...props}
      />
    </>
  );
};
