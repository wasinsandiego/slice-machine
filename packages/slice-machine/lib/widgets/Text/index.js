import * as yup from 'yup'
import { MdTitle } from 'react-icons/md'
import { MockConfigForm } from './Mock/Form'
import { handleMockConfig, handleMockContent } from './Mock'

/**
* {
     "type": "Text",
    "config": {
      "label": "person",
      "placeholder": "Their full name"
    }
  }
 */


import { removeProp } from '../../utils'
import { DefaultFields } from "../../forms/defaults"
import { createInitialValues, createValidationSchema } from "../../forms"

const TYPE_NAME = 'Text'

const FormFields = DefaultFields

const create = (apiId) => ({
  ...createInitialValues(DefaultFields),
  id: apiId
})

const schema = yup.object().shape({
  type: yup.string().matches(/^Text$/, { excludeEmptyString: true }).required(),
  config: createValidationSchema(removeProp(FormFields, 'id'))
});

const Meta = {
  icon: MdTitle,
  title: 'Key Text',
  description: 'Text content'
}

export default {
  create,
  MockConfigForm,
  handleMockConfig,
  handleMockContent,
  Meta,
  schema,
  TYPE_NAME,
  FormFields
}
