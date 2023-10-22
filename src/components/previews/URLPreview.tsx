import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import FourOhFour from '../FourOhFour'
import Loading from '../Loading'
import useFileContent from '../../utils/fetchOnMount'
import { PreviewContainer } from './Containers'

const parseDotUrl = (content: string): string | undefined => {
  return content
    .split('\n')
    .find(line => line.startsWith('URL='))
    ?.split('=')[1]
}

const TextPreview = ({ file }) => {
  const { asPath } = useRouter()
  const { t } = useTranslation()

  const { response: content, error, validating } = useFileContent(`/api/raw/?path=${asPath}`, asPath)
  if (error) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={error} />
      </PreviewContainer>
    )
  }

  if (validating) {
    return (
      <PreviewContainer>
        <Loading />
      </PreviewContainer>
    )
  }

  if (!content) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={t('File is empty.')} />
      </PreviewContainer>
    )
  }

  return (
      <PreviewContainer>
        <pre className="overflow-x-scroll p-0 text-sm md:p-3">{content}</pre>
      </PreviewContainer>
  )
}

export default TextPreview
