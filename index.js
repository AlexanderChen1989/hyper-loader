const pmv = /\s*<script\s+module\s*>([\s\S]*?)<\/script>\s*<script\s+view\s*>([\s\S]*?)<\/script>([\s\S]*)/g
const pm = /\s*<script\s+module\s*>([\s\S]*?)<\/script>([\s\S]*)/g
const pv = /\s*<script\s+view\s*>([\s\S]*?)<\/script>([\s\S]*)/g

module.exports = function(source) {
  var group, result

  group = pmv.exec(source)

  if (group) {
    return `
import { h } from 'hyperapp'
${group[1].trim()}
export default props => {
  ${group[2].trim()}
  return (${group[3].trim()})
}`
  }

  group = pm.exec(source)
  if (group) {
    return `
import { h } from 'hyperapp'
${group[1].trim()}
export default props => {
  return (${group[2].trim()})
}`
  }

  if (group) {
    return `
import { h } from 'hyperapp'
export default props => {
  ${group[1].trim()}
  return (${group[2].trim()})
}
`
  }

  return `
import { h } from 'hyperapp'

export default props => {
  return (${source.trim()})
}
`
}
