import messages from './messages'
import Validators from './index'
import { toObjectMsg, formatMsg, prepare, memoize } from './helpers'


export default function addValidator ({ validator, defaultMessage, defaultMsg }) {
  defaultMsg = toObjectMsg(defaultMsg || defaultMessage) || messages.invalid

  return memoize(function (options={}) {
    let msg = toObjectMsg(options.msg || options.message) || defaultMsg

    return prepare(options.if, options.unless, options.allowBlank, async function (value, allValues) {
      let result = await validator(options, value, allValues)
      if ('boolean' !== typeof result) {
        return result ? Validators.formatMessage(result) : null
      }
      if (!result) {
        return Validators.formatMessage(msg)
      }
    })
  })
}
