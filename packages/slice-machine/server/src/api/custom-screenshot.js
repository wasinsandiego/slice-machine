import fs from 'fs'
import path from 'path'

import { getPathToScreenshot } from '../../../lib/queries/screenshot'
import { getEnv } from '../../../lib/env'

export default async function handler(file, { from, sliceName, variationName, img }) {
  const { env } = await getEnv()

  const { path: filePath, isCustom } = getPathToScreenshot({ cwd: env.cwd, from, sliceName, variationName })

  if (isCustom) {
    fs.unlinkSync(filePath)
  }

  const dest = path.join(env.cwd, from, sliceName, `preview.${file.type.split('/')[1]}`)
  fs.renameSync(file.path, dest)

  return {
    isCustomPreview: true,
    hasPreview: true,
    url: `${env.baseUrl}/api/__preview?q=${encodeURIComponent(dest)}&uniq=${Math.random()}`
  }
}