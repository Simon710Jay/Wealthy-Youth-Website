import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Allow access if the user has an admin-level role
      const role = token?.role as string | undefined;
      return !!role && (role === "admin" || role.endsWith("_admin"));
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin",
    "/admin/((?!login).*)", // match all admin routes except login
  ]
};
