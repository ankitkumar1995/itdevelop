import axios from 'axios';
import Cookies from 'js-cookie';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { BASE_URL } from '../url';
export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 60,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        if (credentials.password === '') {
          return credentials;
          // return {"Authorization":credentials.authorization,"_id":credentials.id}
        } else {
          const result = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (result) {
            return result.data.data;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user._id;
        token.applicationId = user.applicationId;
        token.accessToken = user.Authorization;
        token.loginType = user.loginType;
      }
      return token;
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.applicationId = token.applicationId;
      session.id = token.id;
      session.loginType = token.loginType;
      return session;
    },
  },
});
