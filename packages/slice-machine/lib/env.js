import fs from 'fs'
import path from 'path'
import { getPrismicData } from './auth'
import { parseDomain, fromUrl } from 'parse-domain'
import initClient from './client'

const cwd = process.env.CWD || path.resolve(process.env.TEST_PROJECT_PATH)

const validate = (config) => {
  const errors = {}
  if (!config.apiEndpoint) {
    errors.apiEndpoint = {
      message: 'Expects a property "apiEndpoint" which points to your Prismic api/v2 url',
      example: 'http://my-project.prismic.io/api/v2',
      run: 'npx prismic-cli sm --setup'
    }
  }
  if (!config.storybook) {
    errors.storybook = {
      message: 'Expects a property "storybook" which points to local Storybook.',
      example: 'http://localhost:8888',
      run: 'npx prismic-cli sm --add-storybook'
    }
  }
  try {
  } catch(e) {
    const parsedRepo = parseDomain(fromUrl(config.apiEndpoint))
    if (!parsedRepo || (!parsedRepo.labels && !parsedRepo.subDomains)) {
      errors.apiEndpoint = {
        message: `Could not parse domain of given apiEnpoint (value: "${config.apiEndpoint}")`,
        example: 'http://my-project.prismic.io/api/v2',
        do: 'Update "apiEndpoint" value to match your Prismic api/v2 endpoint'
      }
    }
  }
  return errors
}

export const getEnv = () => {
  const userConfigTxt = fs.readFileSync(path.join(cwd, 'sm.json'), 'utf8')
  const userConfig = JSON.parse(userConfigTxt)
  const maybeErrors = validate(userConfig)
  const parsedRepo = parseDomain(fromUrl(userConfig.apiEndpoint))
  const { auth, base } = getPrismicData()
  return {
    errors: maybeErrors,
    env: {
      cwd,
      ...userConfig,
      ...(parsedRepo.labels || parsedRepo.subDomains ? {
        repo: parsedRepo.labels ? parsedRepo.labels[0] : parsedRepo.subDomains[0]
      } : {}),
      auth,
      base,
      client: initClient(base, parsedRepo, auth)
    }
  }
}