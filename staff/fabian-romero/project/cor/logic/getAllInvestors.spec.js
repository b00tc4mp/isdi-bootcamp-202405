import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import sinon from 'sinon'

import getAllInvestors from './getAllInvestors.js'
import { User } from '../data/models.js'
import errors from '../../com/errors.js'
const { NotFoundError, SystemError, PermissionError } = errors

describe('getAllInvestors', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds when user has project role and investors exist', () => {
        const projectUserId = 'luismaUserId'
        const investorUserIds = []

        return User.create({
            _id: projectUserId,
            role: 'project',
            name: 'Luisma',
            surname: 'Dolores',
            email: 'luisma@dolores.com',
            username: 'luismadolores',
            password: '$2a$08$EevGeaIX5sdS3US3klPBvO.Th1uH88rxlDTgO/VCYBPcHw0tBY7CW',
            avatar: 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-lightning-icon-png-free-buckle-pattern-image_2283126.jpg',
            title: 'title',
            image: 'https://www.caricaturaspacoguzman.com/wp-content/uploads/2019/04/Caricatura.jpg',
            description: 'description',
            category: 'category',
            startDate: new Date('2024-09-13T22:00:00.000Z'),
            endDate: new Date('2025-09-13T22:00:00.000Z'),
            budgetGoal: 3000,
            bank: 'santander',
            match: [],
            likes: []
        })
            .then(() =>
                User.create([
                    {
                        role: 'investor',
                        name: 'Luz',
                        surname: 'Clarita',
                        email: 'luz@clarita.com',
                        username: 'mariaclarita',
                        password: '$2a$08$wnobuR92RbL7Hh7H.1qsm.3.BIeEP04XWkKoEzzFCjHN04.PTJnRm',
                        avatar: 'https://example.com/avatar.jpg',
                        image: 'http://example.com/image',
                        description: 'description',
                        match: [],
                        likes: []
                    },
                    {
                        role: 'investor',
                        name: 'electrocutada',
                        surname: 'sanchez',
                        email: 'electro@kutada.com',
                        username: 'electrocutada',
                        password: '$2a$08$anotherpasswordhash',
                        avatar: 'https://example.com/avatar.jpg',
                        image: 'http://example.com/image',
                        description: 'description2',
                        match: [],
                        likes: []
                    }
                ])
            )
            .then(() => getAllInvestors(projectUserId))
            .then(investors => {
                expect(investors).to.be.an('array')
                expect(investors).to.have.lengthOf(2)
                expect(investors[0]).to.include.keys('id', 'role', 'name')
                expect(investors[1]).to.include.keys('id', 'role', 'name')
                expect(investors[0].name).to.equal('Luz')
                expect(investors[1].name).to.equal('electrocutada')
            })
    })

    it('fails when user does not exist', () => {
        const userId = 'nonExistingUserId'

        return getAllInvestors(userId)
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('fails when user does not have project role', () => {
        const userId = 'investorUserIds'

        return User.create({
            _id: 'investorUserIds',
            role: 'investor',
            name: 'Investor',
            surname: 'User',
            email: 'investor@user.com',
            username: 'investoruser',
            password: '$2a$08$investorpasswordhash',
            avatar: 'https://example.com/avatar.jpg',
            image: 'http://example.com/image',
            description: 'description',
            match: [],
            likes: []
        })
            .then(() => getAllInvestors(userId))
            .catch(error => {
                expect(error).to.be.instanceOf(PermissionError)
                expect(error.message).to.equal('User role is not project')
            })
    })

    it('fails when database query for users with role investor fails', () => {
        const projectUserId = 'luismaUserId'

        return User.create({
            _id: projectUserId,
            role: 'project',
            name: 'Luisma',
            surname: 'Dolores',
            email: 'luisma@dolores.com',
            username: 'luismadolores',
            password: '$2a$08$EevGeaIX5sdS3US3klPBvO.Th1uH88rxlDTgO/VCYBPcHw0tBY7CW',
            avatar: 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-lightning-icon-png-free-buckle-pattern-image_2283126.jpg',
            title: 'title',
            image: 'https://www.caricaturaspacoguzman.com/wp-content/uploads/2019/04/Caricatura.jpg',
            description: 'description',
            category: 'category',
            startDate: new Date('2024-09-13T22:00:00.000Z'),
            endDate: new Date('2025-09-13T22:00:00.000Z'),
            budgetGoal: 3000,
            bank: 'santander',
            match: [],
            likes: []
        })
            .then(() => getAllInvestors(projectUserId))
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('Database error')
            })
            .finally(() => {
                User.find.restore()
            })
    })
})

afterEach(() => User.deleteMany())

after(() => mongoose.disconnect())
