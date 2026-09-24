import {
  Account,
  Client,
  ID,
  Permission,
  Query,
  Role,
  TablesDB,
} from "appwrite";
const client = new Client(); // create the new client that communicates with Appwrite

// "Connect to this Appwrite server and use my TaskFlow project."
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

//  creates the authentication service.
export const account = new Account(client);

// creates the database service we'll eventually use for our tasks.
export const tablesDB = new TablesDB(client);

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const tasksTableId = import.meta.env.VITE_APPWRITE_TASKS_TABLE_ID;

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

export const taskService = {
  async createTask({ title, description, status, userId }) {
    return await tablesDB.createRow({
      databaseId,
      tableId: tasksTableId,
      rowId: ID.unique(),

      data: {
        title,
        description,
        status,
        userId,
      },

      permissions: [
        Permission.read(Role.user(userId)), //means that particular user can read the row.
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ],
    });
  },

  async getTasks(userId) {
    return await tablesDB.listRows({
      databaseId,
      tableId: tasksTableId,
      queries: [Query.equal("userId", [userId]), Query.orderDesc("$createdAt")],  //"means Give me tasks whose userId belongs to the currently logged-in user."
    });
  },

  async updateTask(rowId, { title, description, status }) {
    return await tablesDB.updateRow({
      databaseId,
      tableId: tasksTableId,
      rowId,
      data: {
        title,
        description,
        status,
      },
    });
  },

  async deleteTask(rowId) {
    return await tablesDB.deleteRow({
      databaseId,
      tableId: tasksTableId,
      rowId,
    });
  },
};
