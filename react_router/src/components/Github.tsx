import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()
  return (
    <div>
        <p>{`Your github Followers are ${data.followers}`}</p>
    </div>
  )
}

export default Github