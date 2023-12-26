import React from 'react'
import { BlobProvider } from '@react-pdf/renderer'

const GstPdfProvider = ({ ButtonComponent, pdfDocument, fileName, disabled, onDownloadComplete = () => {}, isdwnLoad, invoiceId }) => {
  try {
    const download = (blob, fileName) => {
      const fileUrl = URL.createObjectURL(blob)
      const elem = document.createElement('a')
      document.body.appendChild(elem)
      elem.style = 'display: none'
      elem.setAttribute('download', `${fileName}`)
      elem.setAttribute('href', fileUrl)
      elem.click()
      onDownloadComplete()
    //   isdwnLoad(true)
    }

    if (!disabled) {
      return (
        <BlobProvider document={pdfDocument}>
            {({ blob, loading, url, error }) => {
                return <ButtonComponent onClick={() => !loading ? download(blob, fileName) : null} />
            }}
        </BlobProvider>
      )
    } else return <ButtonComponent />
  } catch (err) {
    console.log('errr', err)
  }
}

export default GstPdfProvider
