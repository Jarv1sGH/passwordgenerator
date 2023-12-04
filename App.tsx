import {View, Text} from 'react-native';
import React, {useState} from 'react';

import * as Yup from 'yup';

// another way to import
// import { object, string, number, date, InferType } from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Length cannot be less than 4 characters')
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
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
