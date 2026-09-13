import { Account, Client, ID, TablesDB } from "appwrite";

const client = new Client(); // create the new client that communicates with Appwrite

// "Connect to this Appwrite server and use my TaskFlow project."
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setEndpoint(import.meta.env.VITE_APPWRITE_PROJECT_ID);

//  creates the authentication service.
export const account = new Account(client);

// creates the database service we'll eventually use for our tasks.
export const tablesDB = new TablesDB(client);

export const authService = {
  async signup({ email, password, name }) {
    return await account.create(ID.unique(), email, password, name);
  },
  async login({ email, password }) {
    return await account.createEmailPasswordSession(email, password);
  },

  async logout() {
    return await account.deleteSession("current");
  },

  async getCurrentUser() {
    return await account.get();
  },
};
