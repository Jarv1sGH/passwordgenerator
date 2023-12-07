import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {styles} from './Styles';

import * as Yup from 'yup';
// another way to import
// import { object, string, number, date, InferType } from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'atleast 4 characters')
    .max(32, 'max password length is 32')
    .required('password length is required '),
});

const App = () => {
  const [password, setPassword] = useState<string>('');
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
  const copyToClipboard = (str: string) => {
    Clipboard.setString(str);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View style={styles.appWrapper}>
          <Text style={styles.titleText}>Password Generat-inator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
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
            }) => (
              <>
                <View>
                  <View style={styles.passLengthWrapper}>
                    <View>
                      <Text style={styles.passLengthText}>
                        Enter password length
                      </Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={[styles.passLengthError]}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.passLengthInput}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="min:4"
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                </View>

                <View style={styles.optionsWrapper}>
                  <View style={[styles.passLengthWrapper]}>
                    <Text style={[styles.passLengthText]}>
                      Include Lowercase
                    </Text>
                    <BouncyCheckbox
                      style={styles.checkBox}
                      disableBuiltInState
                      isChecked={lowercase}
                      onPress={() => {
                        if (uppercase || useNumbers || specialChars) {
                          setLowercase(!lowercase);
                        }
                      }}
                      fillColor="#29AB87"
                    />
                  </View>

                  <View style={[styles.passLengthWrapper]}>
                    <Text style={[styles.passLengthText]}>
                      Include Uppercase
                    </Text>
                    <BouncyCheckbox
                      style={styles.checkBox}
                      disableBuiltInState
                      isChecked={uppercase}
                      onPress={() => {
                        if (lowercase || useNumbers || specialChars) {
                          setUppercase(!uppercase);
                        }
                      }}
                      fillColor="#29AB87"
                    />
                  </View>

                  <View style={[styles.passLengthWrapper]}>
                    <Text style={[styles.passLengthText]}>Include Numbers</Text>
                    <BouncyCheckbox
                      style={styles.checkBox}
                      disableBuiltInState
                      isChecked={useNumbers}
                      onPress={() => {
                        if (lowercase || uppercase || specialChars) {
                          setUseNumbers(!useNumbers);
                        }
                      }}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={[styles.passLengthWrapper]}>
                    <Text style={[styles.passLengthText]}>
                      Include Special Characters
                    </Text>
                    <BouncyCheckbox
                      style={styles.checkBox}
                      disableBuiltInState
                      isChecked={specialChars}
                      onPress={() => {
                        if (lowercase || uppercase || useNumbers) {
                          setSpecialChars(!specialChars);
                        }
                      }}
                      fillColor="#29AB87"
                    />
                  </View>

                  {isPasswordGenerated ? (
                    <View style={styles.passwordBox}>
                      <Text style={styles.passwordBoxText}>{password}</Text>
                      <TouchableOpacity
                        style={styles.copyIconWrappper}
                        onPress={() => copyToClipboard(password)}>
                        <View>
                          <FontAwesomeIcon size={22} icon={faCopy} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={[
                        styles.buttons,
                        styles.generateBtn,
                        !isValid ? styles.btnDisabled : null,
                      ]}
                      onPress={() => handleSubmit()}>
                      <Text style={styles.btnText}>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.resetBtn, styles.buttons]}
                      onPress={() => {
                        handleReset();
                        clearState();
                      }}>
                      <Text style={styles.btnText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;
