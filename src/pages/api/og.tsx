/* eslint-disable @next/next/no-img-element */
import { ImageResponse, NextRequest } from 'next/server';
import siteConfig from '../../config/site.config';


export const config = {
  runtime: 'edge',
};


const font = fetch(new URL('../../../public/font/Inter.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

export default async function handler(request: NextRequest) {
  const fontData = await font;
  const { searchParams } = new URL(request.url);
  let url = searchParams.get('path') ?? '';
  const hasFileExtension = /\.[^]+$/.test(url);
  const OG = `${siteConfig.domain}/api/thumbnail/?path=${hasFileExtension ? `${url}` : `${url}icon.png`}`;
  const Description = (): string => { 
    let url = searchParams.get('path') ?? '';
    const path = url.toLowerCase();
    if (path.includes('apple')) {
      return `Explore ${title} Firmware and solutions for your Apple device, including guides for common issues.`;
  } else if (path.includes('pixelexperience-rom')) {
      return `Enhance your Android device with Pixel Experience custom ROMs, featuring advanced features and a sleek interface.`;
  } else if (path.includes('apps/windows')) {
      return `Upgrade your device with ${title}, complete with a step-by-step installation guide for increased productivity.`;
  } else if (path.includes('apps/mac-os')) {
      return `Download ${title} for Mac OS devices, complete with step-by-step installation guides.`;
  } else if (path.includes('apps/linux')) {
      return `Download ${title} for Linux, complete with step-by-step installation guides.`;
  } else if (path.includes('apps/android')) {
      return `Download ${title} for Android devices, complete free with step-by-step installation guides.`;
  } else if (path.includes('drivers')) {
      return `Download the latest drivers for seamless device-to-computer communication.`;
  } else if (path.includes('flash-tool')) {
      return `Effortlessly flash custom ROMs and recoveries with our powerful Flash Tool.`;
  } else if (path.includes('frp')) {
      return `Bypass Factory Reset Protection (FRP) on your device using our proven methods and guides.`;
  } else if (path.includes('icloud')) {
      return `Unlock your iCloud-locked device with our trusted methods, including bypass files and step-by-step instructions.`;
  } else if (path.includes('emmc-isp-pinout')) {
      return `Unlock your device and perform advanced tasks like file recovery and dead boot repair using the EMMC ISP Pinout method with tools like UFI and Easy Jtag.`;
  } else {
      return `Discover various resources for your ${title} device, including drivers, firmware, tools, and guides.`;
  }
  };


  const pathParts = url.split('/');
  const title = pathParts[pathParts.length - 2].replaceAll('-',' ').replaceAll('_', ' ');
  const description = Description();

  return new ImageResponse(
    (
      <main tw="h-full w-full flex flex-col p-6 rounded-lg" style={{ background: 'linear-gradient(360deg, #000000, #222222)' }}>
        <div tw="w-full h-full flex flex-col p-16 rounded-lg">
          <div tw="w-full mt-auto flex justify-between item-center">
            <div tw="flex flex-col mt-auto max-w-2xl">
              <h1 tw="text-5xl text-zinc-100">{title}</h1>
              {description && <h2 tw="text-2xl text-zinc-200">{description}</h2>}
            </div>
            <div tw="h-56 w-56 flex">
              <img
                tw="rounded-lg"
                src={OG || siteConfig.noimage}
                alt={title}
              />
            </div>
          </div>
          <div tw="w-full mt-auto flex justify-between item-center">
            <div tw="flex flex-col mt-auto">
              <h1 tw="text-5xl text-zinc-200">{siteConfig.footer}</h1>
            </div>
            <div tw="h-22 w-22 flex">
            <img
              tw="rounded-lg"
              src="https://github.com/rdriveorg.png"
              alt="RDRIVE"
            />
            </div>
          </div>
        </div>
      </main>
    ),
    {
      width: 1280,
      height: 640,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
      headers: {
        'Content-Disposition': `filename=${title}.webp`,
      },
    }
  );
}