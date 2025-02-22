// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
// // Cache styles and static files using CacheFirst strategy
// workbox.routing.registerRoute(
//     /\.(css|js|png|jpg|avif|webp|jpeg|gif|svg)$/,
//     new workbox.strategies.CacheFirst({
//         matchOptions: {
//             ignoreVary: true
//         },
//     })
// );
// // Cache /products/search route with StaleWhileRevalidate strategy
// workbox.routing.registerRoute(
//     new RegExp('/products/search/'),
//     new workbox.strategies.StaleWhileRevalidate({
//         matchOptions: {
//             ignoreVary: true
//         },
//     })
// );
// // Cache specific routes with NetworkFirst strategy
// workbox.routing.registerRoute(
//     new RegExp('/$|/#|/api/|/products/|/checkout/|/account/'),
//     new workbox.strategies.NetworkFirst({
//         matchOptions: {
//             ignoreVary: true
//         },
//     })
// );
// // For everything else, use StaleWhileRevalidate strategy
// workbox.routing.registerRoute(
//     new RegExp('.*'),
//     new workbox.strategies.StaleWhileRevalidate({
//         matchOptions: {
//             ignoreVary: true
//         },
//     })
// );
