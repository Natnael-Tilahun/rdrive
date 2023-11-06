// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'

// import { NotFound } from '../utils/LottieUrl'
// import { Player } from '@lottiefiles/react-lottie-player'
// import Seo from '../components/Meta/Seo'
// import { BsSlashSquare } from 'react-icons/bs'
// import siteConfig from '../config/site.config'
// import { Button } from '@nextui-org/react'
// import { GoSearch } from 'react-icons/go'
// import { Slash } from '../components/icons'

// export default function Custom404({ connectedAccounts }) {
//   const seo = {
//     title: `Oops! That page can’t be found.`,
//     description: `It looks like nothing was found at this location. Maybe try a search?`,
//     keywords: `RDRIVE.ORG, rdrive, RDRIVE, therockstarind, Terms and rules, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
//     url: `${siteConfig.domain}/notfound`,
//     ogImage: `${siteConfig.domain}/404.png`,
//     color: '#000000',
//   };

//   return (<div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
//             <Seo {...seo} />
//             <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
//             <Navbar />
//             <div className="justify-center">
//               <div className="m-auto flex flex-col items-center text-center md:mt-24">
//               <Player autoplay loop src={NotFound} style={{ height: '300px'}} ></Player>
//               <p className="text-2xl md:text-5xl lg:text-5xl text-gray-800 dark:text-white">Oops! That page can’t be found.</p>
//               <p className="md:text-lg lg:text-xl text-gray-600 dark:text-white mt-4">It looks like nothing was found at this location. Maybe try a search?</p>
//               <div className="mt-4 mb-12">
//               <Button
//                 disabled
//                 className="bg-transparent border dark:border-gray-700 overflow-hidden font-sans dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850"
//                 radius="md"
//               >
//               <GoSearch  size={20}/>
//               Type
//               <Slash />
//               to search
//               </Button>
//               </div>
//               </div>
//             </div>
//             </main>
//             <Footer />
//             <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
//           </div>)
// }

// export async function getServerSideProps({req, locale }) {
//   const connectedAccounts = await getOdConcealedAccessTokens();

//   const token = await getAccessToken(0);

//   return {
//           props: {
//                   ...(await serverSideTranslations(locale, ['common'])),
//                           connectedAccounts,
//                           token,
                          
//           },
//   }
// }