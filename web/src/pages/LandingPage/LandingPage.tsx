import { useState } from 'react'

import { Metadata, useMutation } from '@redwoodjs/web'

const CHECK_FILE_QUERY = gql`
  mutation check($file: File!) {
    checkUpload(upload: $file) {
      fileName
      contents
    }
  }
`

const LandingPage = () => {
  const [checkUpload] = useMutation(CHECK_FILE_QUERY)

  const handleFileChange = async (e) => {
    const { data } = await checkUpload({
      variables: { file: e.target.files[0] },
    })

    setResult(data.checkUpload)
  }

  const [result, setResult] = useState()

  return (
    <>
      <Metadata title="Landing" description="Landing page" />
      <h2>
        Welcome to the uploads playground. Pick a file to see how it works!
      </h2>

      <div className="round-lg m-4 rounded bg-gray-800 p-4">
        <h3 className="text-lg font-bold">Upload a file</h3>
        <input type="file" onChange={handleFileChange} />
      </div>

      {result && (
        <div className="round-lg m-4 w-full rounded bg-gray-800 p-4">
          <code>{JSON.stringify(result, null, 4)}</code>
        </div>
      )}
    </>
  )
}

export default LandingPage
