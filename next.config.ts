import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "static0.polygonimages.com" },
      { protocol: "https", hostname: "image.api.playstation.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "cdn.mos.cms.futurecdn.net" },
      { protocol: "https", hostname: "cdn1.epicgames.com" },
      { protocol: "https", hostname: "www.gamewallpapers.com" },
      { protocol: "https", hostname: "4kwallpapers.com" },
      { protocol: "https", hostname: "assets.xboxservices.com" },
      { protocol: "https", hostname: "images.gog.com" },
      { protocol: "https", hostname: "images.wallpapersden.com" },
      { protocol: "https", hostname: "pixiogaming.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "images.launchbox-app.com" },
      { protocol: "https", hostname: "i.redd.it" },
      { protocol: "https", hostname: "www.xtrafondos.com" },
      { protocol: "https", hostname: "cdn2.unrealengine.com" },
      { protocol: "https", hostname: "static.cdprojektred.com" },
      { protocol: "https", hostname: "images.nvidia.com" },
      { protocol: "https", hostname: "assets-prd.ignimgs.com" },
      { protocol: "https", hostname: "images.stopgame.ru" },
      { protocol: "https", hostname: "images.igdb.com" },
    ],
  },
};

export default nextConfig;
