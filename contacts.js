const fs = require('fs').promises;
const path = require('path');


const contactsPath = path.join(__dirname, 'db', 'contacts.json');


async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    if (!contacts.toString()) return []
    return JSON.parse(contacts)
}

async function getContactById(contactId) {
  const contacts = await listContacts();
    return contacts.find(({id}) => id === contactId) || null
}

async function removeContact(contactId) {
   
    const contacts = await listContacts()
    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) return null
    const deletContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return deletContact
}

 async function addContact(name, email, phone) {
    
     const contacts = await listContacts();
    const newContact = {
        id: Date.now().toString(32),
        name,
        email,
        phone,
    };
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}