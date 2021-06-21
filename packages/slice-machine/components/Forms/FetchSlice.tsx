import { useState } from 'react'
import { Field } from 'formik'
import  { Button, Box, Label, Input, Text, Image }from 'theme-ui'

import LibraryState from '../../lib/models/ui/LibraryState'

import Select from 'react-select'

import ModalFormCard from '../../components/ModalFormCard'
import camelCase from 'lodash/camelCase'
import startCase from 'lodash/startCase'

const udateSliceName = (sliceData: { componentCode: string, model: any }, initialSliceName: string, sliceName: string) => {
  return {
    model: {
      ...sliceData.model,
      id: sliceName,
      name: sliceName

    },
    componentCode: sliceData.componentCode.replace(new RegExp(initialSliceName), sliceName),
  }
}

const InputBox = ({ name, label, placeholder, error }:{ name: string, label: string, placeholder: string, error?: string | null }) => (
  <Box mb={3}>
    <Label htmlFor={name} mb={2}>
      { label }
    </Label>
    <Field
      name={name}
      type="text"
      placeholder={placeholder}
      as={Input}
      autoComplete="off"
    />
    { error ? <Text as="p" sx={{ color: 'error', mt: 1 }}>{error}</Text>: null}
  </Box>
)

const UrlInput = ({ onSet }) => {
  const [error, setError] = useState('')

  const getSlice = (url: string) => {
    if (!url || !url.length) {
      return
    }
    setError('')
    fetch(url, {
      method: 'GET',
    }).then(async res => {
      const json = await res.json()
      if (!json.model || !json.componentCode) {
        setError('Returned data is valid')
      }
      const jsonModel = JSON.parse(json.model)
      onSet({ ...json, model: jsonModel, initialSliceName: jsonModel.id })
    })
    .catch(e => {
      setError('Could not fetch url')
      console.error(e)
    })
  }
  return (
    <Box mb={3}>
      <Label htmlFor="url" mb={2}>
        Slice URL
    </Label>
    <Input
      name="url"
      // value={value}
      onChange={e => getSlice(e.target.value.trim())}
      placeholder="https://slice.api.com/..."
    />
    { error ? <Text color="error" mt={2}>{ error }</Text> : null}
    </Box>
  )
}


const formId = "create-new-slice"

const FetchSlice = ({
  isOpen,
  onSubmit,
  close,
  libraries
}: { isOpen: boolean, onSubmit: Function, close: Function, libraries: ReadonlyArray<LibraryState> }) => {

  const [sliceData, setSliceData] = useState(null)

  return (
    <ModalFormCard
      isOpen={isOpen}
      widthInPx="530px"
      formId={formId}
      close={() => close()}
      onSubmit={(values: { sliceName: string }) => {
        onSubmit({ ...values, ...udateSliceName(sliceData, sliceData.initialSliceName, values.sliceName) })
      }}
      initialValues={{
        sliceName: '',
        from: libraries[0].name
      }}
      validate={({ sliceName }: { sliceName: string }) => {
        if (!sliceName) {
          return { sliceName: 'Cannot be empty'}
        }
        if (!sliceName.match(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
          return { sliceName: 'No special character allowed' }
        }
        const cased = startCase(camelCase(sliceName)).replace(/\s/gm, '')
        if (cased !== sliceName.trim()) {
          return { sliceName: 'Value has to be PascalCased' }
        }
      }}
      content={{
        title: 'Import a slice from Overlay',
      }}
    >
      {({ errors, touched, values, resetForm, setFieldValue }: { errors: { sliceName?: string }, touched: { sliceName?: string }, values: any, resetForm: Function, setFieldValue: Function }) => (
        <Box>
          {
            !sliceData ? (
              <UrlInput
                onSet={values => {
                  setFieldValue('sliceName', values.model.id)
                  setSliceData(values)
                }}
              />
            ) : (
              <Box>
                <Button
                  mb={2}
                  onClick={() => {
                    resetForm()
                    setSliceData(null)
                  }}
                  variant="buttons.darkSmall"
                >
                  Back to Import
                </Button>
                <Image src={sliceData.preview}/>
                <InputBox
                  name="sliceName"
                  label="Slice Name"
                  placeholder="MySlice"
                  error={touched.sliceName ? errors.sliceName : null}
                />
                <Label htmlFor="origin" sx={{ mb: 2 }}>Target Library</Label>
                <Select
                  name="origin"
                  options={libraries.map(v => ({ value: v.name, label: v.name}))}
                  onChange={(v: { label: string, value: string} | null) => {
                    console.log({ v })
                  }}
                  defaultValue={{ value: values.from, label: values.from }}
                  theme={(theme) => {
                    return {
                    ...theme,
                    colors: {
                    ...theme.colors,
                      text: 'text',
                      primary: 'background',
                    },
                  }}}
                />
              </Box>
            )
          }
        </Box>
      )}
    </ModalFormCard>
  )
}

export default FetchSlice
