import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Text, Input, Button } from '@ui-kitten/components';

import { Contact, deleteContact, updateContact, postContact } from '../modules/apiManager';

interface Props {
  visible: boolean;
  setShowContactModal: Dispatch<SetStateAction<boolean>>;
  contactData: Contact;
}

export const ContactModal = ({
  visible,
  setShowContactModal,
  contactData,
}: Props): JSX.Element => {
  const { id, name, email, phone, notes } = contactData;

	const insets = useSafeAreaInsets();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const closeButtonHander = () => {
    setShowContactModal(false);
  };

  const deleteButtonHandler = () => {
    deleteContact(id);
    setShowContactModal(false);
  }

  const saveButtonHandler = () => {
    if (id) {
      const updatedContact: any = {};
      if (nameInput.length) updatedContact.name = nameInput;
      if (emailInput.length) updatedContact.email = emailInput;
      if (phoneInput.length) updatedContact.phone = phoneInput;
      if (notesInput.length) updatedContact.notes = notesInput;

      updateContact(id, updatedContact);
      setShowContactModal(false);
    } else {
      const newContact: any = {};
      newContact.name = nameInput;
      newContact.email = emailInput.length ? emailInput : null;
      newContact.phone = phoneInput.length ? phoneInput : null;
      newContact.notes = notesInput.length ? notesInput : null;
      
      postContact(newContact);
      setShowContactModal(false);
    }
  }  

  const onChangeText = (
    inputType: string, 
    defaultValue: string | null, 
    nextValue: string
  ) => {
    if (!id || (nextValue.length && defaultValue !== nextValue)) {
      setSaveDisabled(false);
      switch (inputType) {
        case 'name':
          setNameInput(nextValue);
          break;
        case 'email':
          setEmailInput(nextValue);
          break;
        case 'phone':
          setPhoneInput(nextValue);
          break;
        case 'notes':
          setNotesInput(nextValue);
          break;
      }
    } else {
      setSaveDisabled(true);
    }
  };

	return (
		<Modal animationType="fade" transparent={true} visible={visible}>
			<Layout style={[styles.backdrop, { paddingBottom: insets.bottom + 20 }]}>
        <Layout style={styles.container}>
					<Input
            placeholder='Name'
            defaultValue={name}
            onChangeText={nextValue => onChangeText('name', name, nextValue)}
          />
          <Input
            placeholder='Email'
            defaultValue={email || ''}
            onChangeText={nextValue => onChangeText('email', email, nextValue)}
          />
          <Input
            placeholder='Phone'
            defaultValue={phone || ''}
            onChangeText={nextValue => onChangeText('phone', phone, nextValue)}
          />
          <Input
            placeholder='Notes'
            multiline={true}
            textStyle={{
              height: 60
            }}
            defaultValue={notes || ''}
            onChangeText={nextValue => onChangeText('notes', notes, nextValue)}
          />
          <Layout style={styles.buttonContainer}>
            <Button onPress={saveButtonHandler} disabled={saveDisabled}>SAVE</Button>
            <Button onPress={deleteButtonHandler} status="danger">DELETE</Button>
          </Layout>
				</Layout>
        <Pressable onPress={() => { setShowContactModal(false) }}>
          <Text style={styles.closeIcon}>CANCEL</Text>
        </Pressable>
			</Layout>
		</Modal>
	);
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgb(252, 252, 256)',
    borderRadius: 10,
    padding: 20,
  },
  closeIcon: {
  	color: 'white', 
  	padding: 20, 
  	textAlign: 'left'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '63%',
    justifyContent: 'space-between',
    marginTop: 15
  }
});
