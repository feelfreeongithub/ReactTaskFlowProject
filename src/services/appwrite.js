import { Account, Client, TablesDB } from "appwrite";

const client = new Client(); // create the new client that communicates with Appwrite

// "Connect to this Appwrite server and use my TaskFlow project."
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setEndpoint(import.meta.env.VITE_APPWRITE_PROJECT_ID);

//  creates the authentication service.
export const account = new Account(client);

// creates the database service we'll eventually use for our tasks.
export const tablesDB = new TablesDB(client);
