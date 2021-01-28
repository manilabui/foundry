import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Text, List } from '@ui-kitten/components';

import { getAllContacts, Contact } from '../modules/apiManager';
import { ContactModal } from '../components/ContactModal';

const defaultContacts = [{
		id: 1,
		name: 'Ye',
	  email: 'kanye@west.com',
	  phone: '808-808-8085',
	  notes: 'Kanye <3 Kanye'
	}];

export const HomeScreen = () => {
	const insets = useSafeAreaInsets();
	const [showContact, setShowContactModal] = useState(false);
	const [contacts, setContacts] = useState(defaultContacts);
	const [currContact, setCurrContact] = useState(defaultContacts[0]);

	const loadContacts = async () => {
		const contactList = await getAllContacts();
		setContacts(contactList);
	};

	useEffect(loadContacts, []);

	const buttonHandler = (item) => {
		setCurrContact(item);
		setShowContactModal(true);
	};

	return (
	  <Layout style={[styles.container, { paddingTop: insets.top + 20 }]}>
	    <Text category='h2' style={{ color: 'seagreen' }}>CONTACTS</Text>
	    <List
        style={{ backgroundColor: 'transparent' }}
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => buttonHandler(item)}>
          	<Text>{item.name}</Text>
          </Pressable>
        )}
      />
	    <ContactModal
        visible={showContact}
        setShowContactModal={setShowContactModal}
        contactData={currContact}
      />
	  </Layout>
	)
};

const styles = StyleSheet.create({
  container: {
  	flex: 1, 
  	alignItems: 'center',
  	backgroundColor: 'lightyellow'
  },
});