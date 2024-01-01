/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../Styles/styles';

//fature authentication
const UserInfo = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
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

  return (
    <View>
      <Text>Enter your phone number:</Text>
      <TextInput
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button title="Send Code" onPress={sendVerificationCode} />

      {verificationId && (
        <>
          <Text>Enter the verification code:</Text>
          <TextInput
            placeholder="Verification code"
            value={confirmationCode}
            onChangeText={(text) => setConfirmationCode(text)}
          />
          <Button title="Confirm" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};



// const UserInfo = () => {
//   const [isPressed, setIsPressed] = useState(false);
//   return (
//     <SafeAreaView style={[Styles.screenHeight, { flex: 1 }]}>
//       <View style={[Styles.UsIMainView]}>
//         {/* Login button part */}
//         {/* Login button part */}
//         <View style={[Styles.UsIbtnView]}>
//           <TouchableOpacity
//             style={[
//               Styles.UsILoginbtn,
//               { backgroundColor: isPressed ? 'red' : 'transparent' },
//             ]}
//             underlayColor="transparent"
//             onPressIn={() => setIsPressed(true)}
//             onPressOut={() => setIsPressed(false)}
//           >
//             <Text style={[Styles.UsILoginbtntxt]}>LOG IN</Text>
//           </TouchableOpacity>
//         </View>
//         {/* Imge and txt content part */}
//         <View>
//           {/* img conatienr */}
//           <View>

//           </View>
//           {/* text container */}
//           <View>
//             {/* main text  */}
//             <View>

//             </View>
//             {/* sub text */}
//             <View>

//             </View>
//           </View>
//         </View>
//         {/* Create Profile button */}
//         <View>
//           <View style={[Styles.UsICreateProViw]}>
//             <TouchableOpacity style={[Styles.UsICreateProbtn]}>
//               <Text style={[Styles.UsICreateProbtntxt]}>CREATE PROFILE</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView >
//   );

// };

export default UserInfo;
