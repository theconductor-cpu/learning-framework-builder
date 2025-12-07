import nextPwa from 'next-pwa'

const withPWA = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const config = {}

export default withPWA(config)
