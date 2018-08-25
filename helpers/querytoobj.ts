export function queryToObj(querystring?: string) {
  const ret = {}

  querystring = querystring || (window.location.href.split('?')[1] ? window.location.href.split('?')[1] : '')

  querystring.split('&').forEach(kv => {
    const [key, value] = kv.split('=')
    if (key) ret[key] = value
  })

  return ret
}
