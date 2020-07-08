import React, {useEffect, useState} from 'react'

export default function AsyncComponent(props) {
  const [Component, setComponent] = useState(null)

  useEffect(
    () => {
      let cleanedUp = false
      props.module
        .then(component => {
          if (cleanedUp) {
            return
          }
          setComponent(() => component)
        })
        .catch(e => {
          console.info(e)
          if (cleanedUp) {
            return
          }
          setComponent(null)
          if (e.message.startsWith('Cannot find module')) {
            if (typeof props.onNotFound === 'function') {
              props.onNotFound()
            }
          }
        })
      return () => {
        setComponent(null)
        cleanedUp = true
      }
    },
    [props]
  )

  return Component ? React.createElement(Component, props) : props.loading || 'Loading..'
}
