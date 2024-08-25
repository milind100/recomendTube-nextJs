import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "../../../../backend/dbConfig/dbConnect";
import bcrypt from "bcrypt";
import UserModel from "../../../../backend/models/UserModel";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDb();

        try {
          const user = await UserModel.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User details not matching");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("User details not matching");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session._id = token._id?.toString(); // Convert ObjectId to string
        session.isVerified = token.isVerified;
        session.isAdmin = token.isAdmin;
        session.username = token.username;
        session.name = token.name;
        session.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/login" },
  // eslint-disable-next-line no-undef
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
