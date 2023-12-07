import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  appWrapper: {},
  titleText: {
    fontSize: 25,
    textAlign: 'center',
    padding: 15,
  },
  passLengthWrapper: {
    // borderColor: 'red',
    // borderWidth: 2,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passLengthInput: {
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    marginRight: 10,
    width: 70,
    height: 45,
    borderRadius: 4,
    textAlign: 'center',
  },
  passLengthText: {
    fontSize: 18,
    padding: 8,
  },
  passLengthError: {
    paddingLeft: 10,
    paddingBottom: 4,
    // position: 'absolute',
    color: 'tomato',
  },
  optionsWrapper: {
    marginTop: 20,
  },
  checkBox: {
    marginRight: 5,
  },
  btnContainer: {
    margin: 20,
    padding: 15,
    flexDirection: 'row',
  },
  buttons: {
    width: 150,
    height: 50,
    margin: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateBtn: {
    backgroundColor: 'rgb(44, 130, 201)',
  },
  resetBtn: {
    backgroundColor: 'rgb(209, 209, 240)',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212427',
  },

  btnDisabled: {
    backgroundColor: 'grey',
  },

  passwordBox: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    width: '85%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: 'rgb(209, 209, 240)',
    padding: 0,
  },
  passwordBoxText: {
    textAlign: 'center',
    color: '#212427',
    fontSize: 18,
    width: '90%',
  },
  copyIconWrappper: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 30,
    padding: 0,
    margin: 0,
  },
  copyIcon: {
  },
});
