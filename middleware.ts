import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes under the /login directory
export const config = {
  matcher: [
    '/login/', // This will protect all paths under the /login directory
  ],
};

export default authMiddleware({

});
