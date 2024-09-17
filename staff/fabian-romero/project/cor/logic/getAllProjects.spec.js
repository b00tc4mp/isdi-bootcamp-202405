import 'dotenv/config'
import getAllProject from './getAllProjects.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllProject', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and target user', () =>
        User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123', role: 'investor' })
            .then(user =>
                User.create({ name: 'Paquito', surname: 'Choco', email: 'paquito@choco.com', username: 'paquito', password: '123123123', role: 'project' })
                    .then(() =>
                        getAllProject(user._id.toString(), 'project')
                            .then(investors => {
                                const targetUser = investors[0]
                                expect(targetUser.name).to.equal('Paquito')
                                expect(targetUser.surname).to.equal('Choco')
                                expect(targetUser.email).to.equal('paquito@choco.com')
                                expect(targetUser.username).to.equal('paquito')
                                expect(targetUser.role).to.equal('project')
                            })
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return getAllProject('66e7f467ee1d91f30c52cc3d', 'project')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllProject(123, 'project')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getAllProject('', 'project')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
