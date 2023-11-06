import Seo from '../components/Meta/Seo';
import siteConfig from '../config/site.config';
import { Card, CardBody, Image } from '@nextui-org/react';

export default function Sponsor() {
  const seo = {
    title: `Sponsor`,
    description: `Show your love ❤️ and support rdrive to grow us.`,
    keywords: `RDRIVE.ORG, rdrive, RDRIVE, therockstarind, Terms and rules, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
    url: `${siteConfig.domain}/sponsor`,
    ogImage: `https://cdn3d.iconscout.com/3d/premium/thumb/donation-box-6048172-4997136.png`,
    color: '#000000',
  };

  const links = [
    {
      title: "PhonePe",
      img: "/icons/pay/PhonePe.png",
    },
    {
        title: "PayTm",
        img: "/icons/pay/PayTM.png",
    }
]
  return (      
      <main className="p-2">
        <Seo {...seo} />
          <h1 className="my-4 text-center text-4xl font-bold">Show Your Love ❤️</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2">
            {links.map((link, index) => (
              <Card
                shadow="none"
                className="border dark:border-gray-700"
                key={index}
                isPressable
                isHoverable
              >
                <CardBody className='p-4 overflow-hidden'>
                    <div className="relative h-52 flex items-center justify-center">
                      <Image
                        radius="lg"
                        alt={link.title}
                        className="h-52 object-contain object-center my-10"
                        src={link.img}
                        isBlurred
                      />
                    </div>
                    <div className="flex items-start justify-center mt-4 -mb-2 font-bold text-xl">
                    {/* Snippet making css error so for now disable it. */}
                    {/* <Snippet hideSymbol>{link.title}</Snippet> */}
                    {link.title}
                    </div>
                </CardBody>
              </Card>
            ))}    
          </div>
      </main>
  );
}
