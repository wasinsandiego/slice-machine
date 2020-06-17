import { query } from '../features/query'
import { registry as createRegistry } from '../features/registry'

export const useGetStaticProps = ({
  uid,
  lang,
  params,
  client,
  fs,
  body = 'body',
  type = 'page',
  queryType = 'repeat',
}) => {
  const apiParams = params || { lang }

  return async function getStaticProps({
    preview = null,
    previewData = {},
    params = {}
  }) {

    const registry = await createRegistry(fs)

    const { ref = null } = previewData
    const resolvedUid = typeof uid === 'function' ? uid({ params, previewData, preview }) : (uid || null)
    try {
      const doc = await query({
        queryType,
        apiParams: Object.assign({ ref }, apiParams),
        type,
        uid: resolvedUid,
        client,
      })
      return {
        props: {
          ...doc,
          error: null,
          slices: doc.data[body],
          registry
        }
      }

    } catch(e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[next-slicezone] ${e.toString()}`)
      }
      return {
        props: {
          ref,
          error: e.toString(),
          uid: resolvedUid,
          slices: [],
          registry: null
        }
      }
    }
  }
}