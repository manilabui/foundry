import React, { Dispatch, SetStateAction } from 'react';
import { Image, Modal, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';

import { Contact } from '../modules/apiManager';

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
	const insets = useSafeAreaInsets();

	return (
		<Modal animationType="fade" transparent={true} visible={visible}>
			<Layout style={[styles.backdrop, { paddingBottom: insets.bottom + 20 }]}>
				<Pressable onPress={() => { setShowContactModal(false) }}>
					<Text style={styles.closeIcon}>X</Text>
				</Pressable>
        <Layout style={styles.container}>
					<Text>{contactData.name}</Text>
				</Layout>
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
    borderRadius: 25,
    padding: 20,
  },
  closeIcon: {
  	color: 'white', 
  	padding: 20, 
  	textAlign: 'left'
  }
});
