import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Text, List, Divider, Input } from '@ui-kitten/components';

import { getAllContacts, Contact } from '../modules/apiManager';
import { ContactModal } from '../components/ContactModal';

const defaultContact = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  notes: ''
};

export const HomeScreen = () => {
	const insets = useSafeAreaInsets();
	const [showContact, setShowContactModal] = useState(false);
	const [contacts, setContacts] = useState([defaultContact]);
	const [currContact, setCurrContact] = useState<Contact>(defaultContact);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState<Contact[]|undefined>();

	const loadContacts = async () => {
		const contactList = await getAllContacts();
		setContacts(contactList);
	};

	useEffect(() => { loadContacts() }, []);

	const contactItemHandler = (item: Contact) => {
		setCurrContact(item);
		setShowContactModal(true);
	};

	const onChangeText = (nextValue: string) => {
		const filteredContacts = contacts.filter(({ name }) => name.includes(nextValue));

		setSearch(nextValue);
		setSearchResults(filteredContacts);
	};

	return (
	  <Layout style={[styles.container, { paddingTop: insets.top + 20 }]}>
	    <Text category="h2" style={styles.header}>CONTACTS</Text>
	    <Input
	    	size='medium'
	    	style={styles.search}
        placeholder='Search for a contact'
        value={search}
        onChangeText={nextValue => onChangeText(nextValue)}
      />
      <Divider/>
      <Pressable style={{ padding: 15 }} onPress={() => contactItemHandler(defaultContact)}>
      	<Text category="p2" status="warning">+ Add New Contact</Text>
      </Pressable>
    	<Divider/>
	    <List
        style={{ backgroundColor: 'transparent' }}
        data={search.length ? searchResults : contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        	<>
	          <Pressable style={{ padding: 15 }} onPress={() => contactItemHandler(item)}>
	          	<Text category="label">{item.name}</Text>
	          </Pressable>
          	<Divider/>
          </>
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
  	backgroundColor: 'lightyellow'
  },
  header: { 
  	color: 'seagreen',
  	alignSelf: 'center',
  	paddingBottom: 15
  },
  search: { 
  	width: '50%', 
  	borderColor: 'white', 
  	backgroundColor: 'transparent' 
  }
});