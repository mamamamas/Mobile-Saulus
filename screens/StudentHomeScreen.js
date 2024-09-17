import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import Dialog from 'react-native-dialog';

const StudentHomeScreen = ({ navigation }) => {
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setShowExitDialog(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const handleExit = () => {
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setShowExitDialog(false);
  };

  return (
    <View>
      <Text>Student Home</Text>
      <Dialog.Container visible={showExitDialog}>
        <Dialog.Title>Exit App</Dialog.Title>
        <Dialog.Description>
          Do you want to close the app?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Close" onPress={handleExit} />
      </Dialog.Container>
    </View>
  );
};

export default StudentHomeScreen;
