import * as yup from 'yup'
import Form, { FormFields } from './Form'
import { BsImage } from 'react-icons/bs'

import {
  createInitialValues,
  createValidationSchema
} from 'lib/forms'

import { removeProp } from '../../utils'

/** 
 * {
    "type": "Image",
    "config": {
      "constraint": {
        "width": 100,
        "height": 100
      },
      "thumbnails": [
        {
          "name": "square",
          "width": 500,
          "height": 500
        }
      ],
      "label": "Icon Image"
    }
  } */

const _createMock = (src, { width = 900, height = 500 } = { width: 900, height: 500 }, thumbnails = []) => ({
  dimensions: { width, height },
  alt: 'Placeholder image',
  copyright: null,
  url: src || `https://via.placeholder.com/${width}x${height}`,
  ...thumbnails.reduce((acc, e) => ({
    ...acc,
    [e.name]: _createMock(src, { width: e.width, height: e.height })
  }), [])
})

const defaultValue = _createMock()

const fromUser = (...args) =>
  typeof mock === 'object' ?
  mock :
  _createMock(...args)

const createMock = (maybeMock, model) => maybeMock ? fromUser(mock) : _createMock(null, model.constraint, model.thumbnails)

const create = (apiId) => ({
  ...createInitialValues(FormFields),
  constraint: {},
  thumbnails: [],
  id: apiId
})

const schema = yup.object().shape({
  type: yup.string().matches(/^Image$/, {
    excludeEmptyString: true
  }).required(),
  config: createValidationSchema(removeProp(FormFields, 'id')),
})

const Meta = {
  icon: BsImage,
  title: 'Image',
  description: 'A responsive image field with constraints'
}

export default {
  Meta,
  Form,
  schema,
  create,
  createMock,
  FormFields,
  defaultValue,
  fromUser
}