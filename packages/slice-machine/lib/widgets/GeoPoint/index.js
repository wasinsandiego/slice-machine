import { MdPlace } from 'react-icons/md'
import { createDefaultWidgetValues } from '../../utils'
import { handleMockConfig, handleMockContent } from './Mock'
import { MockConfigForm } from './Mock/Form'

/** : {
  "type" : "GeoPoint",
  "config" : {
    "label" : "geopoints"
  }
} */

const { TYPE_NAME, FormFields, schema, create } = createDefaultWidgetValues('GeoPoint')

const Meta = {
  icon: MdPlace,
  title: 'GeoPoint',
  description: 'A field for storing geo-coordinates'
}

export default {
  create,
  handleMockConfig,
  handleMockContent,
  MockConfigForm,
  FormFields,
  TYPE_NAME,
  schema,
  Meta
}
