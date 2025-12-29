import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_bj2qp_AB.mjs';
import { manifest } from './manifest_oH3kNYdz.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/contact/thanks.astro.mjs');
const _page4 = () => import('./pages/portfolio/_slug_.astro.mjs');
const _page5 = () => import('./pages/sold/_slug_.astro.mjs');
const _page6 = () => import('./pages/studio/_---params_.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const _page8 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/blog/index.astro", _page2],
    ["src/pages/contact/thanks.astro", _page3],
    ["src/pages/portfolio/[slug].astro", _page4],
    ["src/pages/sold/[slug].astro", _page5],
    ["node_modules/@sanity/astro/dist/studio/studio-route.astro", _page6],
    ["src/pages/index.astro", _page7],
    ["src/pages/[...slug].astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "dadea53a-5d73-4293-adcd-be3b385d921c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
