/* eslint-disable prettier/prettier */
import React, { forwardRef, useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, BackHandler } from 'react-native';
import {
    BottomSheetModal,
    useBottomSheetModal
} from '@gorhom/bottom-sheet';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';

//OTP input
import OtpInputs from 'react-native-otp-inputs';

//Style
import Styles from '../../Styles/styles';


export type Ref = BottomSheetModal;

type RootStackParamList = {
    Home: undefined;
    UserInfo: {
        phoneNumber: string;
        credential: FirebaseAuthTypes.AuthCredential;
        isLoggedIn: boolean;
    };
};

type NavigationType = NavigationProp<RootStackParamList>;

const BottomSheetModel = forwardRef<Ref>((props, ref) => {

    const navigation = useNavigation<NavigationType>();

    const { dismissAll } = useBottomSheetModal();

    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [borderColor, setBorderColor] = useState('#0177dd');
    const [label, setLabel] = useState('Phone number');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

    const handlePhoneNumberChange = (inputText: any) => {
        const cleanedPhoneNumber = inputText.replace(/[^0-9]/g, '');
        setPhoneNumber(cleanedPhoneNumber);

        if (cleanedPhoneNumber.length < 10) {
            setBorderColor('red');
            setLabel("What's your phone number");
        } else {
            setBorderColor('blue');
            setLabel('Phone Number');
        }
    };

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setBottomSheetIndex(1);
            },

        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setBottomSheetIndex(0);
            },
        );

        const handleBackPress = () => {
            // Handle back press
            dismissAll();
            console.log('hiiii');
            return true; // Prevent default behavior (exiting the app)
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            // Cleanup the event listener when the component unmounts
            backHandler.remove();
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const isButtonDisabled = phoneNumber.length < 10;
    const buttonBackgroundColor = isButtonDisabled ? '#83bcf0' : '#0177dd';
    const isVerifyButtonDisabled = confirmationCode.length < 6;
    const buttonBackgroundColorVerify = isVerifyButtonDisabled ? '#83bcf0' : '#0177dd';

    // variables
    const snapPoints = useMemo(() => ['35%', '48%'], []);

    const handlePress = () => {
        setBottomSheetIndex(1);
    }

    const sendVerificationCode = async () => {
        try {
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
            if (confirmation.verificationId !== null) {
                setVerificationId(confirmation.verificationId);
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const confirmCode = async () => {
        try {
            setLoading(true);
            const credential = auth.PhoneAuthProvider.credential(
                verificationId,
                confirmationCode
            );

            await auth().signInWithCredential(credential);
            console.log(credential);

            // Send the providerId to the user info page
            navigation.navigate('UserInfo', {
                phoneNumber: phoneNumber,
                credential: credential,
                isLoggedIn: true,
            });



            setVerificationId('');
            setPhoneNumber('');
            setConfirmationCode('');
            dismissAll();

        } catch (error) {
            console.error('Error confirming verification code:', error);
        }
        finally {
            setLoading(false);
        }
    };


    // renders
    return (
        <View style={styles.container}>
            <BottomSheetModal
                ref={ref}
                index={bottomSheetIndex}
                snapPoints={snapPoints}
            >
                <View style={Styles.AUcontentContainer}>
                    {/* Get User Phone numer */}
                    {!verificationId && (
                        <View>
                            <View style={Styles.UAmainToptxtConatienr}>
                                <View>
                                    <Text style={Styles.UAmainText}>Login / Register</Text>
                                </View>
                                <View>
                                    <Text>Please enter your Phone Number</Text>
                                </View>
                            </View>
                            <View style={[Styles.AUNuminputbox, { borderColor }]}>
                                <View style={Styles.AUtxtgeneral}>
                                    <Text style={{ fontSize: 12, color: borderColor, fontWeight: '400' }}>
                                        {label}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={Styles.UADropdownSelector}>
                                        <Text>+91</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={[Styles.AUPNuminput]}
                                        keyboardType="numeric"
                                        value={phoneNumber}
                                        onChangeText={handlePhoneNumberChange}
                                        maxLength={10}
                                        onPressIn={handlePress}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[Styles.UAContinueBtn, { backgroundColor: buttonBackgroundColor }]}
                                disabled={isButtonDisabled}
                                onPress={sendVerificationCode}>
                                <Text style={Styles.UAContinueBtntxt}>Continue</Text>
                            </TouchableOpacity>
                            {/* <View>
                            <Text>or Continue With Email/Username</Text>
                        </View> */}
                        </View>
                    )}
                    {/* Get User OTP */}
                    {verificationId && (
                        <View >
                            <View style={Styles.AUMainheadcontainer}>
                                <Text style={Styles.AUMainheadtext}>Let's Verify your mobile number</Text>
                                <Text style={Styles.AUMainheadtextNum}>{'+91 ' + phoneNumber}</Text>
                            </View>
                            <View>
                                <Text style={Styles.AUtxtmessage}>Enter OTP sent to your mobile number</Text>
                                {/* <TextInput
                                    placeholder="Verification code"
                                    value={confirmationCode}
                                    textContentType="oneTimeCode"
                                    onChangeText={(text) => setConfirmationCode(text)}
                                /> */}
                                <OtpInputs
                                    handleChange={(text) => setConfirmationCode(text)}
                                    numberOfInputs={6}
                                    autofillFromClipboard={false}
                                    style={styles.OtpBoxStyle}
                                    inputStyles={styles.OtpInputStyle}
                                    inputContainerStyles={styles.OtpinputContainerStyles}
                                    focusStyles={styles.OtpfocusStyles}
                                />
                            </View>
                            <View style={Styles.AUtextMessBottom}>
                                <Text style={Styles.AUtxtmessageBottom}>Din't receive the code?
                                </Text>
                                <TouchableOpacity>
                                    <Text style={Styles.AUtxtmessageBottomRE}> Resend OTP</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[Styles.UAContinueBtn, { backgroundColor: buttonBackgroundColorVerify }]}
                                disabled={isVerifyButtonDisabled}
                                onPress={confirmCode}>
                                <Text style={Styles.UAContinueBtntxt}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {loading && (
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        {/* <Text style={{ color: '#ffffff', marginTop: 10 }}>Loading...</Text> */}
                    </View>
                )}
            </BottomSheetModal>
        </View >
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    OtpBoxStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    OtpinputContainerStyles: {
        height: 56,
        width: 56,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'pink',
    },
    OtpInputStyle: {
        height: 54,
        width: 54,
        fontSize: 20,
        textAlign: 'center',
    },
    OtpfocusStyles: {
        borderColor: '#03DAC6',
        borderWidth: 2,
    },

});

export default BottomSheetModel;
