import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {gray, primaryHeadingColor, purple, white} from '../../constants/Color';
import {moderateScale} from 'react-native-size-matters';
import {screenWidth} from '../../constants/ScreenResolution';
import Heading from '../../components/Heading';
import {KumbhSansExtraBold} from '../../constants/Fonts';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const CarAnimation = new Animated.Value(-screenWidth + 250);
  const navigation: any = useNavigation();
  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    Animated.sequence([
      Animated.timing(CarAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(CarAnimation, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <Animated.Image
        style={[
          styles.CarProp,
          {
            transform: [
              {
                translateY: CarAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-screenWidth + 250, 0],
                }),
              },
              {
                scale: CarAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
        resizeMode="contain"
        source={require('../../../assets/Images/SignUpProp.png')}
      />
      <View style={styles.headingBox}>
        <Heading
          text="Sign Up"
          fontSize={moderateScale(40, 0.1)}
          fontFamily={KumbhSansExtraBold}
          color={primaryHeadingColor}
          textAlign="left"
        />
        <View style={styles.InputBox}>
          <Input
            placeholder="First Name"
            value={firstName}
            setValue={setFirstName}
            type="text"
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            setValue={setLastName}
            type="text"
          />
          <Input
            placeholder="Email"
            value={email}
            setValue={setEmail}
            type="text"
          />
          <Input
            placeholder="Contact"
            value={contact}
            setValue={setContact}
            type="text"
          />
          <Input
            placeholder="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            value={confirmpassword}
            setValue={setConfirmPassword}
            type="password"
          />
        </View>
        <View style={styles.signInButtonContainer}>
          <Button
            fontSize={moderateScale(14, 0.1)}
            backgroundColor={purple}
            color={white}
            text="Register Now"
            padding={moderateScale(10, 0.1)}
            textAlign="center"
            borderRadius={moderateScale(100, 0.1)}
            width="50%"
            onPress={() => navigation.navigate('')}
          />
        </View>
        <View style={styles.dontHaveBox}>
          <Text style={styles.dontHaveBoxText}>Already have an account?</Text>
          <Button
            fontSize={moderateScale(12, 0.1)}
            backgroundColor={null}
            color={purple}
            text="Sign In!"
            padding={moderateScale(0, 0.1)}
            textAlign="center"
            borderRadius={moderateScale(0, 0.1)}
            width="30%"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headingBox: {
    width: moderateScale(screenWidth - 100, 0.1),
  },
  InputBox: {
    marginTop: moderateScale(20, 0.1),
  },
  signInButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(15, 0.1),
  },
  dontHaveBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: moderateScale(15, 0.1),
  },
  dontHaveBoxText: {
    color: gray,
  },
  CarProp: {
    width: moderateScale(200, 0.1),
    resizeMode: 'contain',
    height: moderateScale(180, 0.1),
  },
});

export default SignUp;