/* eslint-disable prettier/prettier */
import React, { forwardRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';

//Style
import Styles from '../../Styles/styles';

export type Ref = BottomSheetModal;

const BottomSheetModel = forwardRef<Ref>((props, ref) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [borderColor, setBorderColor] = useState('#0177dd');
    const [label, setLabel] = useState('Phone number');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);

    const showlogout = false;
    const showlogin = true;

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

    const isButtonDisabled = phoneNumber.length < 10;
    const buttonBackgroundColor = isButtonDisabled ? '#83bcf0' : '#0177dd';

    // variables
    const snapPoints = ['46%'];

    const sendVerificationCode = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
            setVerificationId(confirmation.verificationId);
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
    };

    const confirmCode = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(
                verificationId,
                confirmationCode
            );
            await auth().signInWithCredential(credential);
            console.log('User signed in successfully');
            console.log(credential);
        } catch (error) {
            console.error('Error confirming verification code:', error);
        }
    };


    // renders
    return (
        <View style={styles.container}>
            <BottomSheetModal
                ref={ref}
                index={0}
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
                        <View>
                            <View>
                                <Text>Let's Verify your mobile number</Text>
                                <Text>{'+91 ' + phoneNumber}</Text>
                            </View>
                            <View>
                                <Text>Enter OTP sent to your mobile number</Text>
                                <TextInput
                                    placeholder="Verification code"
                                    value={confirmationCode}
                                    textContentType="oneTimeCode"
                                    onChangeText={(text) => setConfirmationCode(text)}
                                />
                            </View>
                            <View>
                                <Text>Din't receive the code?
                                    <TouchableOpacity>
                                        <Text>Resend OTP</Text>
                                    </TouchableOpacity>
                                </Text>
                            </View>

                            <TouchableOpacity style={Styles.UAContinueBtn} onPress={confirmCode}>
                                <Text>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

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
});

export default BottomSheetModel;
