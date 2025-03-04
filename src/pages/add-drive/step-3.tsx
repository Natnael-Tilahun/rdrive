import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


import siteConfig from '../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import { getAuthPersonInfo, requestTokenWithAuthCode, sendTokenToServer } from '../../utils/oAuthHandler'
import { LoadingIcon } from '../../components/Loading'
import { getPrincipals } from '../../utils/odAuthTokenStore'

import { Player } from '@lottiefiles/react-lottie-player'
import { Step3 } from '../../utils/LottieUrl'

import { setExpiryTimeLeft, setAccountAlreadyConnected, setAuthPersonInfo, setButtonContent, setButtonError } from '../../redux/features/step3Slice';
import { useAppDispatch, useAppSelector, RootState } from '../../redux/store'
import { FaArrowLeft, FaCheck, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'


export default function OAuthStep3({ 
  accessToken, expiryTime, refreshToken, error, 
  description, errorUri, principals, token }) {
  
  const router = useRouter()
  const dispatch = useAppDispatch();
  
  const expiryTimeLeft = useAppSelector((state:RootState) => state.oAuthStep3.expiryTimeLeft);
  const accountAlreadyConnected = useAppSelector((state:RootState) => state.oAuthStep3.accountAlreadyConnected);
  const authPersonInfo = useAppSelector((state:RootState) => state.oAuthStep3.authPersonInfo);
  
  useEffect(() => {
    getAuthPersonInfo(accessToken)
      .then(({ data, status }) => {
        dispatch(setAuthPersonInfo({ data, status }));
        if (Object.values(principals).includes(data.userPrincipalName)) {
          dispatch(setAccountAlreadyConnected(true));
          dispatch(setExpiryTimeLeft(0));
        }
      });
  
    if (!expiryTimeLeft) return;
  
    const intervalId = setInterval(() => {
      dispatch(setExpiryTimeLeft(expiryTimeLeft - 1));
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [accessToken, dispatch, expiryTimeLeft, principals]);
  

  const buttonContent = useAppSelector((state:RootState) => state.oAuthStep3.buttonContent);
  const buttonError = useAppSelector((state:RootState) => state.oAuthStep3.buttonError);

  const sendAuthTokensToServer = async () => {
    dispatch(setButtonError(false));
    dispatch(setButtonContent(
      <div>
        <span>{t('Storing tokens')}</span> <LoadingIcon />
      </div>
    ));

    // verify identity of the authenticated user with the Microsoft Graph API
    const { data, status } = authPersonInfo;
    if (status !== 200) {
      dispatch(setButtonError(true));
      dispatch(setButtonContent(
        <div>
          <span>{t('Error validating identify, restart')}</span> <FaExclamationCircle />
        </div>
      ));
      return
    }
    
    const principalNames = siteConfig.userPrincipalName.split(',').map(name => name.trim());
    const principalName = data.userPrincipalName.trim();

    if (principalNames.indexOf(principalName) < 0) {
      dispatch(setButtonError(true));
      dispatch(setButtonContent(
        <div>
          <span>{t('Do not pretend to be the site owner')}</span> <FaExclamationCircle />
        </div>
      ));
      return
    }

    await sendTokenToServer(accessToken, refreshToken, expiryTime, principalName)
      .then(() => {
        dispatch(setButtonError(false));
        dispatch(setButtonContent(
          <div>
            <span>{t('Stored! Going home...')}</span> <FaCheck />
          </div>
        ));
        setTimeout(() => {
          //window.location.href = '/#new-drive';
          window.location.href = '/';
        }, 3000)
      })
      .catch(_ => {
        dispatch(setButtonError(true));
        dispatch(setButtonContent(
          <div>
            <span>{t('Error storing the token')}</span> <FaExclamationCircle />
          </div>
        ));
      })
  }

  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Head>
        <title>{t(`OAuth Step 3 - ${siteConfig.title}`)}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />

        <div className="mx-auto w-full max-w-6xl p-4">
          <div className="rounded-lg bg-white p-3 dark:bg-black dark:text-gray-100">
            <div className="mx-auto w-52">
            <Player autoplay loop src={Step3} style={{ height: '200px'}} ></Player>
            </div>
            <h3 className="mb-4 text-center text-xl font-medium">
              {t('Welcome to your new RDRIVE 🎉')}
            </h3>

            <h3 className="mt-4 mb-2 text-lg font-medium">{t('Step 3/3: Get access and refresh tokens')}</h3>
            {error || accountAlreadyConnected ? (
              <div>
                <p className="py-1 font-medium text-red-500">
                  <FaExclamationCircle className="mr-2" />
                  <span>
                    {accountAlreadyConnected ? t("This OneDrive account is already connected") : t('Whoops, looks like we got a problem: {{error}}.', {
                      // t('No auth code present')
                      error: t(error),
                    })}
                  </span>
                </p>
                <p className="my-2 whitespace-pre-line rounded-lg border border-gray-400/20 bg-gray-50 p-2 font-mono text-sm opacity-80 dark:bg-black">
                  {
                    // t('Where is the auth code? Did you follow step 2 you silly donut?')
                    accountAlreadyConnected ? authPersonInfo.data.userPrincipalName : t(description)
                  }
                </p>
                {errorUri && (
                  <p>
                    <Trans>
                      Check out{' '}
                      <a
                        href={errorUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Microsoft's official explanation
                      </a>{' '}
                      on the error message.
                    </Trans>
                  </p>
                )}
                <div className="mb-2 mt-6 text-right">
                  <button
                     className="rounded-lg bg-gradient-to-br from-red-500 to-orange-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:grayscale dark:focus:ring-red-800"
                     onClick={() => {
                       router.push('/add-drive/step-1')
                     }}
                   >
                     <FaArrowLeft /> <span>{t('Restart')}</span>
                   </button>
                 </div>
               </div>
             ) : (
               <div>
                 <p className="py-1 font-medium">{t('Success! The API returned what we needed.')}</p>
                 <ol className="py-1">
                   {accessToken && (
                     <li>
                       <FaCheckCircle className="text-green-500" />{' '}
                       <span>
                         {t('Acquired access_token: ')}
                         <code className="font-mono text-sm opacity-80">{`${accessToken.substring(0, 60)}...`}</code>
                       </span>
                     </li>
                   )}
                   {refreshToken && (
                     <li>
                       <FaCheckCircle className="text-green-500" />{' '}
                       <span>
                         {t('Acquired refresh_token: ')}
                         <code className="font-mono text-sm opacity-80">{`${refreshToken.substring(0, 60)}...`}</code>
                       </span>
                     </li>
                   )}
                 </ol>
 
                 <p className="py-1 text-sm font-medium text-teal-500">
                   <FaExclamationCircle className="mr-1" />{' '}
                   {t('These tokens may take a few seconds to populate after you click the button below. ') +
                     t('If you go back home and still see the welcome page telling you to re-authenticate, ') +
                     t('revisit home and do a hard refresh.')}
                 </p>
                 <p className="py-1">
                   {t(
                     'Final step, click the button below to store these tokens persistently before they expire after {{minutes}} minutes {{seconds}} seconds. ',
                     {
                       minutes: Math.floor(expiryTimeLeft / 60),
                       seconds: expiryTimeLeft - Math.floor(expiryTimeLeft / 60) * 60,
                     }
                   ) +
                     t(
                       "Don't worry, after storing them, RDRIVE will take care of token refreshes and updates after your site goes live."
                     )}
                 </p>
 
                 <div className="mb-2 mt-6 text-right">
                   <button
                     className={`rounded-lg bg-gradient-to-br px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 ${
                       buttonError
                         ? 'from-red-500 to-orange-400 focus:ring-red-200 dark:focus:ring-red-800'
                         : 'from-green-500 to-teal-300 focus:ring-green-200 dark:focus:ring-green-800'
                     }`}
                     onClick={sendAuthTokensToServer}
                   >
                     <span>{buttonContent.text}</span> <FaCheck />
                   </button>
                 </div>
               </div>
             )}
           </div>
         </div>
       </main>
 
       <Footer />
     </div>
   )
 }
 
 export async function getServerSideProps({ query, locale }) {
   const { authCode } = query
 
   // Return if no auth code is present
   if (!authCode) {
     return {
       props: {
         error: 'No auth code present',
         description: 'Where is the auth code? Did you follow step 2 you silly donut?',
         ...(await serverSideTranslations(locale, ['common'])),
       },
     }
   }
 
   const response = await requestTokenWithAuthCode(authCode)
 
   // If error response, return invalid
   if ('error' in response) {
     return {
       props: {
         error: response.error,
         description: response.errorDescription,
         errorUri: response.errorUri,
         ...(await serverSideTranslations(locale, ['common'])),
       },
     }
   }
 
   const { expiryTime, accessToken, refreshToken } = response
   
 
   return {
     props: {
       error: null,
       expiryTime,
       accessToken,
       refreshToken,
       ...(await serverSideTranslations(locale, ['common'])),
       principals: await getPrincipals()
     },
   }
 }