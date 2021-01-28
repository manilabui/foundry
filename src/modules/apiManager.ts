const baseURL = 'https://address-book-api-demo.herokuapp.com/api/contacts';

export interface Contact {
	id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
}

export const getContact = async (id: number): Promise<Contact> => {
  const r = await fetch(`${baseURL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return r.json();
};

export const getAllContacts = async () => {
  const r = await fetch(baseURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await r.json();
  return data;
};

export const deleteContact = async (id: number) => {
  const r = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return r;
};

export const postContact = async (contact: Contact) => {
  const r = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact)
  });

  return r.json();
};

export const updateContact = async (contact: Contact) => {
  const r = await fetch(baseURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact)
  });

  return r.json();
};
