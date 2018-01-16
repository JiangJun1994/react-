import noop from 'lodash-es/noop'
import merge from 'lodash-es/merge'

export default class BekitAccessor {

  children = new Set()
  isActive = true

  constructor(owner, options = {}, onChange) {
    this.owner = owner
    this.options = options
    this.onChange = onChange ? onChange : owner.forceUpdate ? owner.forceUpdate.bind(owner) : noop
  }

  add(accessor) {
    if (accessor instanceof BekitAccessor) {
      this.children.add(accessor)
    }

    return this
  }

  delete(accessor) {
    if (accessor instanceof BekitAccessor) {
      this.children.delete(accessor)
    }

    return this
  }

  has(accessor) {
    return this.children.has(accessor)
  }

  setResult(result) {
    this.onChange(result, {})
    this.children.forEach(accessor => accessor.setResult(result))
  }

  toJSON() {
    const plainObject = merge({}, this.options)

    for (const accessor of this.children.values()) {
      if (accessor.isActive) {
        merge(plainObject, accessor.toJSON())
      }
    }

    return plainObject
  }
}
