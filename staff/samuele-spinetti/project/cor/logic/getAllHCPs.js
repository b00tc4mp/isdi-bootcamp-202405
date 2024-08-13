import { HealthCareProvider } from '../data/models.js'

import { errors } from '../../com/index.js'
const { SystemError } = errors

export default function getAllHCPs() {
    return HealthCareProvider.find({}, { __v: 0 }).sort({ name: 1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(healthCareProviders => healthCareProviders)
}