import { useRouter } from 'next/router';

const Description = (): string => {    
    const { query, asPath } = useRouter();
    const fileName = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
    const extensionIndex = fileName.lastIndexOf('.');
    const title = extensionIndex !== -1 ? fileName.slice(0, extensionIndex) : fileName;
    const path = asPath.toLowerCase(); 
    if (path.includes('apple')) {
    return `Explore ${title} firmware and solutions for your Apple device, including guides for common issues.`;
    } else if (path.includes('pixelexperience-rom')) {
    return `Enhance your Android device with Pixel Experience custom ROMs, featuring advanced features and a sleek interface.`;
    } else if (path.includes('apps/windows')) {
    return `Upgrade your Windows device with ${title}, complete with a step-by-step installation guide for increased productivity.`;
    } else if (path.includes('apps/mac-os')) {
    return `Download ${title} for Mac OS devices, complete with step-by-step installation guides.`;
    } else if (path.includes('apps/linux')) {
    return `Download ${title} for Linux, complete with step-by-step installation guides.`;
    } else if (path.includes('apps/android')) {
    return `Download ${title} for Android devices, completely free, with step-by-step installation guides.`;
    } else if (path.includes('games/windows')) {
    return `Download ${title} game for your Windows PC, including guides for installation and gameplay.`;
    } else if (path.includes('games/mac-os')) {
    return `Download ${title} games for your Mac OS, complete with installation instructions and gameplay tips.`;
    } else if (path.includes('games/linux')) {
    return `Download ${title} Linux-compatible games, with guides for installation and optimizing your gaming experience.`;
    } else if (path.includes('games/android')) {
    return `Download ${title} games for your Android device, along with installation guides and gaming strategies.`;
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


export default Description;
