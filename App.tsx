import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// another way to import
// import { object, string, number, date, InferType } from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, 'Length cannot be less than 8 characters')
    .max(32, 'max password length is 32')
    .required('password length is a required field'),
});

const App = () => {
  const [password, setPassword] = useState<string>('second');
  const [isPasswordGenerated, setIsPasswordGenerated] =
    useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [useNumbers, setUseNumbers] = useState<boolean>(false);
  const [specialChars, setSpecialChars] = useState<boolean>(false);

  const passwordStringGenerator = (length: number): void => {
    let characterString = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = `!@#$%^&*()_+-=[]{}|\;:'",.<>/?~`;

    if (uppercase) {
      characterString += upperCaseChars;
    }
    if (lowercase) {
      characterString += lowerCaseChars;
    }
    if (useNumbers) {
      characterString += numbers;
    }
    if (specialChars) {
      characterString += specialCharacters;
    }

    const passwordResult = passwordGenerator(length, characterString);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const passwordGenerator = (length: number, characters: string): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const clearState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setUseNumbers(false);
    setSpecialChars(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View>
          <Text>Password Generat-inator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log(values);
              passwordStringGenerator(Number(values.passwordLength));
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleReset,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <View>
                  <View>
                    <Text>Enter password length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text>{errors.passwordLength}</Text>
                    )}
                    <TextInput
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex:12"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View>
                  <Text>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="#29AB87"
                  />
                </View>

                <View>
                  <Text>Include Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#29AB87"
                  />
                </View>

                <View>
                  <Text>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useNumbers}
                    onPress={() => setUseNumbers(!useNumbers)}
                    fillColor="#29AB87"
                  />
                </View>
                <View>
                  <Text>Include Special Characters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={specialChars}
                    onPress={() => setSpecialChars(!specialChars)}
                    fillColor="#29AB87"
                  />
                </View>

                <View>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => handleSubmit()}>
                    <Text>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      clearState();
                    }}>
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View>
            <Text>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;
