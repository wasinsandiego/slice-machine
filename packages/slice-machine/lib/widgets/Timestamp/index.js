import * as yup from 'yup'
import { MdDateRange } from 'react-icons/md'
import { handleMockConfig, handleMockContent } from './Mock'
import { MockConfigForm } from './Mock/Form'

/** {
    "type" : "Timestamp",
    "config" : {
      "label" : "timestamp",
      "placeholder" : "timestamp"
    }
  } */


import { removeProp } from '../../utils'
import { DefaultFields } from "../../forms/defaults"
import { createInitialValues, createValidationSchema } from '../../forms'

const TYPE_NAME = 'Timestamp'

const FormFields = DefaultFields

const create = (apiId) => ({
  ...createInitialValues(DefaultFields),
  id: apiId
})

const schema = yup.object().shape({
  type: yup.string().matches(/^Timestamp$/, { excludeEmptyString: true }).required(),
  config: createValidationSchema(removeProp(FormFields, 'id'))
});

const Meta = {
  icon: MdDateRange,
  title: 'Timestamp',
  description: 'A calendar date picker with time'
}

export default {
  handleMockConfig,
  handleMockContent,
  MockConfigForm,
  create,
  schema,
  FormFields,
  TYPE_NAME,
  Meta
}