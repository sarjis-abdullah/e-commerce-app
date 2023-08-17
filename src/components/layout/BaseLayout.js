import React from 'react'

const BaseLayout = ({children}) => {
  return (
    <section className="segment-outer">
      {children}
    </section>
  )
}

export default BaseLayout