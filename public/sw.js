if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>t(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/314-74bf53f7d8672151.js",revision:"74bf53f7d8672151"},{url:"/_next/static/chunks/588-b8d38764561199c5.js",revision:"b8d38764561199c5"},{url:"/_next/static/chunks/a1a65adf-1c5ce41e3f538022.js",revision:"1c5ce41e3f538022"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-b7722eee6611ceff.js",revision:"b7722eee6611ceff"},{url:"/_next/static/chunks/pages/404-7e2ac9acb2921b81.js",revision:"7e2ac9acb2921b81"},{url:"/_next/static/chunks/pages/_app-c83b4e3e9198ef60.js",revision:"c83b4e3e9198ef60"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/about-291c1aea5233c172.js",revision:"291c1aea5233c172"},{url:"/_next/static/chunks/pages/index-9762b9cdf725dc70.js",revision:"9762b9cdf725dc70"},{url:"/_next/static/chunks/pages/login-2df8190797d4a700.js",revision:"2df8190797d4a700"},{url:"/_next/static/chunks/pages/notes-34e2bbbd29874e9a.js",revision:"34e2bbbd29874e9a"},{url:"/_next/static/chunks/pages/register-9f640a8fc34f61bc.js",revision:"9f640a8fc34f61bc"},{url:"/_next/static/chunks/pages/settings-ad7b558a6c1f8def.js",revision:"ad7b558a6c1f8def"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5752944655d749a0.js",revision:"5752944655d749a0"},{url:"/_next/static/css/0e4d9c9068bea89e.css",revision:"0e4d9c9068bea89e"},{url:"/_next/static/css/401a60d01621a7ff.css",revision:"401a60d01621a7ff"},{url:"/_next/static/css/63c4e0994f8c03b5.css",revision:"63c4e0994f8c03b5"},{url:"/_next/static/css/8e3b5a2b61e6d99b.css",revision:"8e3b5a2b61e6d99b"},{url:"/_next/static/css/99cca726e9cc7df9.css",revision:"99cca726e9cc7df9"},{url:"/_next/static/css/b6fa60ad86492ed5.css",revision:"b6fa60ad86492ed5"},{url:"/_next/static/css/cf54134ea433efbc.css",revision:"cf54134ea433efbc"},{url:"/_next/static/media/Montserrat-Bold.1cf218ee.eot",revision:"1cf218ee"},{url:"/_next/static/media/Montserrat-Bold.2ddbd7d9.woff2",revision:"2ddbd7d9"},{url:"/_next/static/media/Montserrat-Bold.47a8ad33.ttf",revision:"47a8ad33"},{url:"/_next/static/media/Montserrat-Bold.7c663390.woff",revision:"7c663390"},{url:"/_next/static/media/Montserrat-Medium.2ee05d49.woff",revision:"2ee05d49"},{url:"/_next/static/media/Montserrat-Medium.734b4e53.eot",revision:"734b4e53"},{url:"/_next/static/media/Montserrat-Medium.9dc728ee.ttf",revision:"9dc728ee"},{url:"/_next/static/media/Montserrat-Medium.a3914e79.woff2",revision:"a3914e79"},{url:"/_next/static/media/down-arrow-red.e79b3440.png",revision:"e79b3440"},{url:"/_next/static/media/down-arrow.1f2abf80.png",revision:"1f2abf80"},{url:"/_next/static/uJWM_iiwv9wLozvUW5ncs/_buildManifest.js",revision:"c68d7d33569e91df578e1d48020f51a5"},{url:"/_next/static/uJWM_iiwv9wLozvUW5ncs/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"0b1838c4374695f6be009bf7d3f51583"},{url:"/icon-256x256.png",revision:"a91ab670d265d75dda30d70956c11926"},{url:"/icon-384x384.png",revision:"ed24fb936bb9426652d26b638eb3bdb1"},{url:"/icon-512x512.png",revision:"27ee12e9e2074da9ee99e797fb1b5d4e"},{url:"/manifest.json",revision:"3cef18991d04ff4e71b7945e38d72fbe"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
