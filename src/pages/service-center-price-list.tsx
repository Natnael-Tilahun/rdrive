import siteConfig from '../config/site.config'
import Seo from '../components/Meta/Seo'
import MarkdownPreview from '../components/UI/Markdown'

export default function PriceList() {
  const seo = {
    title: `Service Center Price List | ${siteConfig.title}`,
    description: `All Brand Service Center Price List`,
    keywords: `RDRIVE.ORG, Service Center Price List, rdrive, RDRIVE, therockstarind, Terms and rules, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
    url: `${siteConfig.domain}/service-center-price-list`,
    ogImage: `${siteConfig.domain}/api/raw/?path=/assets/price-list/icon.png`,
    color: '#000000',
  };

  return (
    <div className="p-2">
      <Seo {...seo} />
        <MarkdownPreview file={{ name: 'readme.md' }} path={'Assets/Price-List'} standalone={false} />
    </div>
  )
}
