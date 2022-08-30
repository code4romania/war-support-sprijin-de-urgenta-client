/* eslint-disable @typescript-eslint/no-var-requires */
const endpoints = require('../../endpoints.json')
const fetch = require('node-fetch')
const { faker } = require('@faker-js/faker')
const fs = require('fs-extra')
const path = require('path')

const data = {
  type: 1,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone_number: faker.phone.phoneNumber('##########'),
  email: faker.internet.email(),
  password: faker.internet.password(20),
}
const userFile = process.env.GITHUB_WORKSPACE
  ? path.join(process.env.GITHUB_WORKSPACE, 'cypress', 'fixtures', 'user.json')
  : `./cypress/fixtures/user.json`

const createUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PUBLIC_API}/en${endpoints.registration}`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        ...data,
        username: data.email,
        re_password: data.password,
      }),
    }
  )
  try {
    const response = await res.json()
    fs.outputFileSync(
      userFile,
      JSON.stringify({
        ...response,
        user: { ...response.user, password: data.password },
      }),
      (e) => {
        if (e) {
          console.log('Error creating the file', e)
        } else {
          console.log('Successfully created user fixture. Happy testing!')
        }
      }
    )
  } catch (e) {
    console.log('Error creating the user', e)
  }
}

module.exports = () => {
  if (!fs.existsSync(userFile)) {
    createUser()
  }
  return {}
}
