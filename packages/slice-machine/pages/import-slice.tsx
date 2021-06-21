import React, { useContext, useState } from 'react'
import { Spinner, Flex } from 'theme-ui'

import { LibrariesContext } from '../src/models/libraries/context'

import FetchSlice from '../components/Forms/FetchSlice'

import { fetchApi } from '../lib/builders/common/fetch'

export default function ImportSlice() {
  const [isOpen, setIsOpen] = useState(true)
  const libraries = useContext(LibrariesContext)
  const locaLibs = libraries?.filter(e => e.isLocal)

  const onSubmit = ({ sliceName, from, ...sliceData }: { sliceName: string, from: string }) => {
    fetchApi({
      url: `/api/slices/create`,
      params: {
        method: 'POST',
        body: JSON.stringify({
          from,
          sliceName,
          values: sliceData
        })
      },
      setData() {},
      successMessage: 'Slice was correctly saved!',
      onSuccess({ reason, variationId }: { reason: string, variationId: string }) {
        if (reason) {
          return console.error(reason)
        }
        window.location.href = `/${from}/${sliceName}/${variationId}`
      }
    })
  }
  return (
    <div>
      <Flex
        sx={{ width: '100%', height: '90vh', alignItems: 'center', justifyContent: 'center'}}
      >
        <Spinner variant="styles.spinner" />
        <FetchSlice
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          libraries={locaLibs}
          onSubmit={onSubmit}
        />
      </Flex>
    </div>
  )
}