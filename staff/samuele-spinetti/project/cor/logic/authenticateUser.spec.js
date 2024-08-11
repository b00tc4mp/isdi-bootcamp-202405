import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError, CredentialsError } = errors

describe('authenticateUser',)