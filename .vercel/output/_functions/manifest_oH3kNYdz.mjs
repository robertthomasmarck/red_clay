import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_D7BvvPET.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BzUlZdnV.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Business/RedDesignCode/red_clay/","cacheDir":"file:///C:/Business/RedDesignCode/red_clay/node_modules/.astro/","outDir":"file:///C:/Business/RedDesignCode/red_clay/dist/","srcDir":"file:///C:/Business/RedDesignCode/red_clay/src/","publicDir":"file:///C:/Business/RedDesignCode/red_clay/public/","buildClientDir":"file:///C:/Business/RedDesignCode/red_clay/dist/client/","buildServerDir":"file:///C:/Business/RedDesignCode/red_clay/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/thanks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact/thanks","isIndex":false,"type":"page","pattern":"^\\/contact\\/thanks\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}],[{"content":"thanks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact/thanks.astro","pathname":"/contact/thanks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/studio/[...params]","pattern":"^\\/studio(?:\\/(.*?))?\\/?$","segments":[[{"content":"studio","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Business/RedDesignCode/red_clay/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Business/RedDesignCode/red_clay/src/pages/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Business/RedDesignCode/red_clay/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Business/RedDesignCode/red_clay/src/pages/portfolio/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/portfolio/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Business/RedDesignCode/red_clay/src/pages/sold/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/sold/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Business/RedDesignCode/red_clay/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Business/RedDesignCode/red_clay/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["C:/Business/RedDesignCode/red_clay/src/pages/contact/thanks.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contact/thanks@_@astro":"pages/contact/thanks.astro.mjs","\u0000@astro-page:src/pages/portfolio/[slug]@_@astro":"pages/portfolio/_slug_.astro.mjs","\u0000@astro-page:src/pages/sold/[slug]@_@astro":"pages/sold/_slug_.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/studio/_---params_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"pages/_---slug_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_oH3kNYdz.mjs","C:/Business/RedDesignCode/red_clay/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BFX3Pa6e.mjs","C:\\Business\\RedDesignCode\\red_clay\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Business\\RedDesignCode\\red_clay\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_2WaDx-yN.mjs","@astrojs/react/client.js":"_astro/client.CQcZHr-G.js","C:/Business/RedDesignCode/red_clay/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.j0a47UWP.js","C:/Business/RedDesignCode/red_clay/src/components/PostCard.astro?astro&type=script&index=0&lang.ts":"_astro/PostCard.astro_astro_type_script_index_0_lang.DQkPpRLt.js","C:/Business/RedDesignCode/red_clay/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DeOk0y2s.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources2.js":"_astro/resources2.Cvtgmt8d.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources6.js":"_astro/resources6.BHmPcXiL.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/VideoPlayer.js":"_astro/VideoPlayer.5ppRLrCD.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources4.js":"_astro/resources4.CGWhBoqO.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources.js":"_astro/resources.wIPM9rnS.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources5.js":"_astro/resources5.ResurxTJ.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources3.js":"_astro/resources3.RbNqK0u6.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.js":"_astro/ViteDevServerStopped.Du11iJgx.js","C:/Business/RedDesignCode/red_clay/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.B3LKGmjz.js","C:/Business/RedDesignCode/red_clay/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.GBM2fZUf.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/index.js":"_astro/index.CPI72WWs.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/index2.js":"_astro/index2.DUN1msdn.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/index3.js":"_astro/index3.BQXS123Y.js","C:/Business/RedDesignCode/red_clay/node_modules/@sanity/vision/lib/_chunks-es/resources.js":"_astro/resources.Bg6cHA20.js","C:/Business/RedDesignCode/red_clay/node_modules/@sanity/vision/lib/_chunks-es/SanityVision.js":"_astro/SanityVision.CakyYwZP.js","C:/Business/RedDesignCode/red_clay/node_modules/sanity/lib/_chunks-es/resources7.js":"_astro/resources7.D6HOkswI.js","C:/Business/RedDesignCode/red_clay/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.v5-0z0eu.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Business/RedDesignCode/red_clay/src/components/PostCard.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".post-card.with-image\").forEach(e=>{e.addEventListener(\"mouseenter\",()=>{e.classList.add(\"has-hovered\")},{once:!0})});"]],"assets":["/_astro/_slug_.BQShUWR8.css","/_astro/index.Clh6t0wC.css","/favicon.ico","/favicon.svg","/robots.txt","/admin/config.yml","/admin/index.html","/fonts/Legan.otf","/img/clay-image-1.jpg","/img/clay-images-10.jpg","/img/clay-images-11.jpg","/img/clay-images-12.jpg","/img/clay-images-15.jpg","/img/clay-images-16.jpg","/img/clay-images-17.jpg","/img/clay-images-2.jpg","/img/clay-images-20.jpg","/img/clay-images-3.jpg","/img/clay-images-4.jpg","/img/clay-images-6.jpg","/img/clay-images-7.jpg","/img/clay-images-8.jpg","/img/clay_astro_dark.png","/img/clay_astro_light.png","/img/red-logo-frontpage-no-text.afdesign","/img/red-logo-frontpage-no-text.png","/img/red-logo-frontpage.png","/img/red-rock-1.jpeg","/img/red-rock-2.jpeg","/_astro/browser.iF-raMsr.js","/_astro/client.A9Ey14Lk.js","/_astro/client.CQcZHr-G.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DeOk0y2s.js","/_astro/index.CPI72WWs.js","/_astro/index2.DUN1msdn.js","/_astro/index3.BQXS123Y.js","/_astro/Layout.astro_astro_type_script_index_0_lang.j0a47UWP.js","/_astro/refractor.GBM2fZUf.js","/_astro/resources.Bg6cHA20.js","/_astro/resources.wIPM9rnS.js","/_astro/resources2.Cvtgmt8d.js","/_astro/resources3.RbNqK0u6.js","/_astro/resources4.CGWhBoqO.js","/_astro/resources5.ResurxTJ.js","/_astro/resources6.BHmPcXiL.js","/_astro/resources7.D6HOkswI.js","/_astro/router.C9lgjDKd.js","/_astro/SanityVision.CakyYwZP.js","/_astro/stegaEncodeSourceMap.B3LKGmjz.js","/_astro/studio-component.CWd2wZpW.js","/_astro/studio-component.v5-0z0eu.js","/_astro/VideoPlayer.5ppRLrCD.js","/_astro/ViteDevServerStopped.Du11iJgx.js","/blog/index.html","/contact/thanks/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"51P38kBrvnkCaI/dj4nA2UQU+iAolL7qzHejFRER79Q="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
