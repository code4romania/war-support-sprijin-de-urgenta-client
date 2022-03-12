/* eslint-disable @typescript-eslint/no-var-requires */
const endpoints = require('../../endpoints.json')
const fetch = require('node-fetch')
const { faker } = require('@faker-js/faker')
const fs = require('fs')

const data = {
  type: 1,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(20),
}
const userFile = `./user.json`

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
    const response = await res.text()
    fs.writeFile('./user.json', response, (e) => {
      console.log('Error creating the file', e)
    })
  } catch (e) {
    console.log('Error creating the user', e)
  }
}

if (!fs.existsSync(userFile)) {
  createUser()
}
