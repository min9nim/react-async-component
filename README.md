## react-asynccomponent

Load react component dynamically

<br>

### Usage

```js
import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Loading from 'components/Loading'
import AsyncComponent from '@mgsong/react-async-component'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        render={({ history, location }) => {
          console.info('[Dynamic Routing] ' + location.pathname)
          return (
            <AsyncComponent
              module={import('./pages' + location.pathname).then(
                (module) => module.default,
              )}
              loading={<Loading />}
              onNotFound={() => {
                history.push('/404')
              }}
            />
          )
        }}
      />
    </BrowserRouter>
  )
}
```
