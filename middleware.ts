import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware


// ------------------ заменен вход на сайт без авторизаций
// export default authMiddleware({
//   publicRoutes: ["/api/webhook"]
// });
 
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
 
export default authMiddleware({
  publicRoutes: [
    "/api/webhook",    // Stripe и UploadThing
  ],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};