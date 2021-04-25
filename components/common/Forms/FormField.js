import React from 'react';
import { useFormikContext } from 'formik';
import { Text} from 'react-native';

import AppTextInput from '../AppTextInput';
import FormErrorMessage from './FormErrorMessage';
import { Title } from 'native-base';

export default function FormField({ title, name, width, leftIcon, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched
  } = useFormikContext();

  return (
    <React.Fragment>
      <AppTextInput
        title={title}
        leftIcon={leftIcon}
        value={values[name]}
        onChangeText={text => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
