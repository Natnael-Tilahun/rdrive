
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation, Trans } from 'next-i18next'

import siteConfig from '../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { LoadingIcon } from '../../components/Loading'
import { extractAuthCodeFromRedirected, generateAuthorisationUrl } from '../../utils/oAuthHandler'

import { Step2 } from '../../utils/LottieUrl'
import { Player } from '@lottiefiles/react-lottie-player'

import { setOAuthRedirectedUrl, setAuthCode, setButtonLoading} from '../../redux/features/step-2Slice'
import { useAppDispatch, useAppSelector, RootState } from '../../redux/store'
import { getAccessToken } from '../../utils/odAuthTokenStore'
import { clientId, clientSecret } from '../../config/api.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaExclamationCircle, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import { Image } from '@nextui-org/react'

export default function OAuthStep2({ token }) {
  const router = useRouter()
  const dispatch = useAppDispatch();
  
  const oAuthRedirectedUrl = useAppSelector((state:RootState) => state.oAuthStep2.oAuthRedirectedUrl);
  const authCode = useAppSelector((state:RootState) => state.oAuthStep2.authCode);
  const buttonLoading = useAppSelector((state:RootState) => state.oAuthStep2.buttonLoading);

  const { t } = useTranslation()

  const oAuthUrl = generateAuthorisationUrl()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Head>
        <title>{t(`OAuth Step 2 - ${siteConfig.title}`)}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />

        <div className="mx-auto w-full max-w-6xl p-4">
          <div className="rounded-lg bg-white p-3 dark:bg-black dark:text-gray-100">
            <div className="mx-auto w-52">
            <Player autoplay loop src={Step2} style={{ height: '200px'}} ></Player>
            </div>
            <h3 className="mb-4 text-center text-xl font-medium">
              {t('Welcome to your new RDRIVE 🎉')}
            </h3>

            <h3 className="mt-4 mb-2 text-lg font-medium">{t('Step 2/3: Get authorisation code')}</h3>

            <p className="py-1 text-sm font-medium text-red-400">
              <Trans>
                <FaExclamationCircle className="mr-1" /> If you are not the owner of this website,
                stop now, as continuing with this process may expose your personal files in OneDrive.
              </Trans>
            </p>

            <div
              className="relative my-2 cursor-pointer rounded-lg border border-gray-500/50 bg-gray-50 font-mono text-sm hover:opacity-80 dark:bg-black"
              onClick={() => {
                window.open(oAuthUrl)
              }}
            >
              <div className="absolute top-0 right-0 p-1 opacity-60">
                <FaExternalLinkAlt />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap p-2">
                <code>{oAuthUrl}</code>
              </pre>
            </div>

            <p className="py-1">
              <Trans>
                The OAuth link for getting the authorisation code has been created. Click on the link above to get the{' '}
                <b className="underline decoration-yellow-400 decoration-wavy">authorisation code</b>. Your browser will
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                open a new tab to Microsoft's account login page. After logging in and authenticating with your
                Microsoft account, you will be redirected to a blank page on localhost. Paste{' '}
                <b className="underline decoration-teal-500 decoration-wavy">the entire redirected URL</b> down below.
              </Trans>
            </p>

            <div className="my-4 mx-auto w-2/3 overflow-hidden rounded-lg">
              <Image src="/images/step-2-screenshot.png" width={1466} height={607} alt="step 2 screenshot" />
            </div>

            <input
              className={`my-2 w-full flex-1 rounded-lg border bg-gray-50 p-2 font-mono text-sm font-medium focus:outline-none focus:ring dark:bg-black dark:text-white ${
                authCode
                  ? 'border-green-500/50 focus:ring-green-500/30 dark:focus:ring-green-500/40'
                  : 'border-red-500/50 focus:ring-red-500/30 dark:focus:ring-red-500/40'
              }`}
              autoFocus
              type="text"
              placeholder="http://localhost/?code=M.R3_BAY.c0..."
              value={oAuthRedirectedUrl}
              onChange={e => {
                dispatch(setOAuthRedirectedUrl(e.target.value));
                dispatch(setAuthCode(extractAuthCodeFromRedirected(e.target.value)));
              }}
            />

            <p className="py-1">{t('The authorisation code extracted is:')}</p>
            <p className="my-2 overflow-hidden truncate rounded-lg border border-gray-400/20 bg-gray-50 p-2 font-mono text-sm opacity-80 dark:bg-black">
              {authCode ?? <span className="animate-pulse">{t('Waiting for code...')}</span>}
            </p>

            <p>
              {authCode
                ? t('✅ You can now proceed onto the next step: requesting your access token and refresh token.')
                : t('❌ No valid code extracted.')}
            </p>

            <div className="mb-2 mt-6 text-right">
              <button
                className="rounded-lg bg-gradient-to-br from-green-500 to-cyan-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:grayscale dark:focus:ring-green-800"
                disabled={authCode === ''}
                onClick={() => {
                  dispatch(setButtonLoading(true));
                  router.push({ pathname: '/add-drive/step-3', query: { authCode } })
                }}
              >
                {buttonLoading ? (
                  <>
                    <span>{t('Requesting tokens')}</span> <LoadingIcon />
                  </>
                ) : (
                  <>
                    <span>{t('Get tokens')}</span> <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  const accessToken = await getAccessToken(0);
  if (accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      clientId,
      clientSecret,
    },
  }
}