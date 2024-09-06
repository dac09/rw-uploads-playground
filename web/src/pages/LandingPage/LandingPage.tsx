import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const LandingPage = () => {
  return (
    <>
      <Metadata title="Landing" description="Landing page" />
      <p>Welcome to the uploads playground. Pick a file to see how it works!</p>
    </>
  )
}

export default LandingPage
