import get from 'lodash-es/get'
import toPath from 'lodash-es/toPath'
import isObject from 'lodash-es/isObject'
import cloneDeep from 'lodash-es/cloneDeep'
import BekitAccessor from './BekitAccessor'

export default class BekitManager {

  result = {}
  translation = {}

  constructor(translation) {
    if (isObject(translation)) {
      this.translation = cloneDeep(translation)
    }
    this.accessor = new BekitAccessor(this)
  }

  addAccessor(accessor) {
    return this.accessor.add(accessor)
  }

  setResult(result) {
    if (isObject(result) && result.hits) {
      this.result = cloneDeep(result)
      this.accessor.setResult(this.result)
    }
  }

  translate(text, scope) {
    return get(this.translation, toPath(scope).concat(text), text)
  }
}
