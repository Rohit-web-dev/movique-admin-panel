import { Client, Databases, Query, ID, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65855c8c96ca1d4be76e');

export const databases = new Databases(client);

export const account = new Account(client)

// const appwriteService = {
//     login: async ({ email, password }) => {
//       try {
//         console.log('Attempting to log in with:',  email, password );
//         const session = await account.createEmailSession(email, password);
//         console.log('Login successful:', session);
//         return session;
//       } catch (error) {
//         console.error('Login error:', error.message);
//         throw error;
//       }
//     },
//   };

export class AppwriteService {
    async createUserAccount({ email, password, name, phone }) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name, phone)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    //   async login({ email, password }) {
    //     try {
    //       return await account.createEmailSession(email, password)
    //     } catch (error) {
    //       throw error
    //     }
    //   }

    async login({ email, password }) {
        try {
          console.log('Attempting to log in with:', email, password);
    
          // Check if there's an existing session
          try {
            const currentSession = await account.get();
            if (currentSession) {
              console.log('Existing session found:', currentSession);
              return currentSession;
            }
          } catch (error) {
            // If there's an error fetching the current session, it likely means there's no active session
            console.log('No active session found, proceeding to create a new one.');
          }
    
          // No active session found, create a new session
          const session = await account.createEmailSession(email, password);
          console.log('Login successful:', session);
          return session;
        } catch (error) {
          console.error('Login error:', error.message);
          throw error;
        }
      }

    // async login({ email, password }) {
    //     try {
    //         console.log('Attempting to log in with:', email, password);

    //         // Check if there's an existing session
    //         try {
    //             const currentSession = await account.get();
    //             if (currentSession) {
    //                 console.log('Existing session found:', currentSession);
    //                 return currentSession;
    //             }
    //         } catch (error) {
    //             // If there's an error fetching the current session, it likely means there's no active session
    //             console.log('No active session found, proceeding to create a new one.');
    //         }

    //         // No active session found, create a new session
    //         const session = await account.createSession(email, password);
    //         console.log('Login successful:', session);
    //         return session;
    //     } catch (error) {
    //         console.error('Login error:', error.message);
    //         throw error;
    //     }
    // }

    async forgetPassword(newPassword) {
        try {
            const password = await account.updatePassword(this.getCurrentUser(), newPassword);
            return password
        }
        catch (error) {
            console.log(error)
        }
    }

    async isLoggedIn() {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) { }
        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.log("getcurrentUser error: " + error)
        }
        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }

    async getAllUsers() {
        try {
            const users = await account.listUsers();
            console.log(users);
            return users;
        } catch (error) {
            throw error;
        }
    }

}

const appwriteService = new AppwriteService()

export default appwriteService