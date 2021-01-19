import * as yup from 'yup'
import { MdDateRange } from 'react-icons/md'
import { createMock, handleMockContent } from './mock'

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
  createMock,
  handleMockContent,
  create,
  schema,
  FormFields,
  TYPE_NAME,
  Meta
}