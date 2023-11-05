import { getBaseUrl } from '../../../utils/getBaseUrl'

const PDFEmbedPreview: React.FC<{ file: any, path }> = ({ file, path }) => {

  const pdfPath = encodeURIComponent(
    `${getBaseUrl()}/api/raw/?path=${path}`
  )
  const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${pdfPath}`

  return (
    <main className="p-4 overflow-y-scroll">
      <div className="w-full rounded-lg" style={{ height: '90vh' }}>
        <iframe src={url} frameBorder="0" width="100%" height="100%"></iframe>
      </div>
    </main>
  )
}

export default PDFEmbedPreview