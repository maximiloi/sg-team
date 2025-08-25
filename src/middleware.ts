export { auth as middleware } from '@/app/auth/authSetup';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth|$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
  ],
};

// import { auth } from '@/auth/authSetup';

// export default auth((req) => {
//   const { pathname, origin } = req.nextUrl;

//   const publicPaths = ['/', '/login', '/registration'];

//   if (!req.auth && !publicPaths.includes(pathname)) {
//     const newUrl = new URL('/login', origin);
//     return Response.redirect(newUrl);
//   }

//   return;
// });
