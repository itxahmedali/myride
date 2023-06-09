import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  DrawerHeader,
  Heading,
  Icon,
  Input,
  RbSheet,
  ViewHeader,
} from '../../components/Index';
import {moderateScale} from 'react-native-size-matters';
import {
  KumbhSansExtraBold,
  backgroundColor,
  darkGray,
  emailRegex,
  gray,
  lightGray,
  purple,
  screenWidth,
  white,
} from '../../constants/Index';
import {AppContext, useAppContext} from '../../context/AppContext';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePickerOptions from '../../components/ImagePickerOptions';
import {useNavigation} from '@react-navigation/native';

const PersonalInformation = ({}) => {
  const navigation = useNavigation()

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [sheet, setSheet] = useState(false);
  const {user, setUser} = useAppContext(AppContext);
  const [illustratorProp] = useState(new Animated.Value(screenWidth + 250));
  useEffect(() => {
    startAnimations();
  }, []);

  useEffect(() => {
    if (
      firstName === '' ||
      lastName === '' ||
      !emailRegex.test(email) ||
      email === '' ||
      contact === '' ||
      address === ''
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, email, contact, address]);
  useEffect(() => {
    setEmail(user?.email);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setContact(user?.contact);
  }, []);
  const startAnimations = () => {
    Animated.timing(illustratorProp, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{flex: 1}}>
      <DrawerHeader navigate={navigation} style={{paddingBottom:moderateScale(10)}}/>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <ViewHeader
            heading="Personal Information"
            icon={'home'}
            headingColor={darkGray}
            fontSize={20}
            style={styles.header}
            navigation={navigation}
            path={'Home'}
          />
          <Heading
            text="Edit Information"
            fontSize={moderateScale(18)}
            fontFamily={KumbhSansExtraBold}
            color={purple}
            textAlign="left"
            style={styles.heading}
          />
          <View style={styles.profileForm}>
            <View style={styles.prfoileImageContainer}>
              {imageSource ? (
                <Image
                  source={{uri: imageSource.uri}}
                  resizeMode="cover"
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../../../assets/Images/AppLogo.png')}
                  resizeMode="cover"
                  style={styles.profileImage}
                />
              )}
              <TouchableOpacity
                style={styles.editButtonContainer}
                onPress={() => setSheet(true)}>
                <Icon
                  name={'edit'}
                  style={styles.editButton}
                  size={13}
                  color={white}
                />
              </TouchableOpacity>
            </View>
            <Input
              value={firstName}
              setValue={setFirstName}
              placeholder="First Name"
              type="text"
              style={styles.input}
              placeholderTextColor={gray}
            />
            <Input
              value={lastName}
              setValue={setLastName}
              placeholder="Last Name"
              type="text"
              style={styles.input}
              placeholderTextColor={gray}
            />
            <Input
              value={email}
              setValue={null}
              disabled={true}
              placeholder="Email Address"
              type="text"
              style={styles.input}
              placeholderTextColor={gray}
            />
            <Input
              value={contact}
              setValue={setContact}
              placeholder="Contact No."
              type="text"
              style={styles.input}
              placeholderTextColor={gray}
            />
            <Input
              value={address}
              setValue={setAddress}
              placeholder="Address"
              type="text"
              style={styles.input}
              placeholderTextColor={gray}
            />
            <Button
              disabled={disabled}
              fontSize={moderateScale(14)}
              backgroundColor={purple}
              color={white}
              text="Save"
              padding={moderateScale(10)}
              textAlign="center"
              borderRadius={moderateScale(100)}
              width="50%"
              style={styles.saveButton}
              onPress={() => {
                console.log('Information Save');
              }}
            />
          </View>
        </View>
        <Animated.View style={{transform: [{translateY: illustratorProp}]}}>
          <Image
            style={styles.prop}
            resizeMode="contain"
            source={require('../../../assets/Images/personalInformation.png')}
          />
        </Animated.View>
      </ScrollView>
      <RbSheet sheet={sheet} setSheet={setSheet}>
        <ImagePickerOptions setImageSource={setImageSource} setSheet={setSheet}/>
      </RbSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    marginTop: moderateScale(20),
  },
  heading: {
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(20),
  },
  profileForm: {
    marginTop: moderateScale(30),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prfoileImageContainer: {
    position: 'relative',
    width: moderateScale(100),
    marginBottom: moderateScale(30),
  },
  editButtonContainer: {
    backgroundColor: purple,
    width: moderateScale(30),
    height: moderateScale(30),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(0),
    borderRadius: moderateScale(100),
    borderColor: white,
    borderWidth: moderateScale(1),
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(100),
  },
  input: {
    backgroundColor: lightGray,
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
    width: moderateScale(screenWidth - 40),
    borderRadius: moderateScale(5),
  },
  saveButton: {
    marginTop: moderateScale(20),
  },
  prop: {
    marginVertical: moderateScale(30),
  },
});

export default PersonalInformation;
