import moment from 'moment-jalaali'
import 'moment/locale/fa.js'

moment.loadPersian({ dialect: 'persian-modern' })

// c = element to scroll to or top position in pixels
// e = duration of the scroll in ms, time scrolling
// d = (optative) ease function. Default easeOutCuaic
export function scrollTo (a, c, e, d) {
  if (!d) { d = easeOutCuaic }; a = a || document.documentElement; if (a.scrollTop === 0) { var b = a.scrollTop; ++a.scrollTop; a = b + 1 === a.scrollTop-- ? a : document.body }b = a.scrollTop; if (e > 0) { if (typeof b === 'object') { b = b.offsetTop } if (typeof c === 'object') { c = c.offsetTop } (function (a, b, c, f, d, e, h) { function g () { if (f < 0 || f > 1 || d <= 0) { a.scrollTop = c } else { a.scrollTop = b - (b - c) * h(f); f += d * e; setTimeout(g, e) } }g() }(a, b, c, 0, 1 / e, 20, d)) }
}
function easeOutCuaic (t) { t--; return t * t * t + 1 }

export function getMonthsList (minDate, maxDate, date) {
  let list = []
  let min = minDate ? minDate.clone().startOf('jMonth').unix() : -Infinity
  let max = maxDate ? maxDate.clone().endOf('jMonth').unix() : Infinity
  for (let i = 0; i < 12; i++) {
    let m = date.clone().jMonth(i)
    if (m.clone().startOf('jMonth').unix() < min || m.clone().endOf('jMonth').unix() > max) {
      m.disabled = true
    }
    list.push(m)
  }
  return list
}

function safeGetProperty (object, property) {
  return property === '__proto__' ? undefined : object[property]
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   extend({}, yourObj_1, [yourObj_N]);
 */
export const extend = function (/* obj_1, [obj_2], [obj_N] */) {
  if (arguments.length < 1 || typeof arguments[0] !== 'object') {
    return false
  }

  if (arguments.length < 2) {
    return arguments[0]
  }

  var target = arguments[0]

  // convert arguments to array and cut off target object
  var args = Array.prototype.slice.call(arguments, 1)

  var val, src

  args.forEach(function (obj) {
    // skip argument if isn't an object, is null, or is an array
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return
    }

    Object.keys(obj).forEach(function (key) {
      src = safeGetProperty(target, key) // source value
      val = safeGetProperty(obj, key) // new value

      // recursion prevention
      if (val === target) {

        /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
      } else if (typeof val !== 'object' || val === null) {
        target[key] = val

        // just clone arrays (and recursive clone objects inside)
      } else if (Array.isArray(val)) {
        target[key] = deepCloneArray(val)

        // custom cloning and overwrite for specific objects
      } else if (isSpecificValue(val)) {
        target[key] = cloneSpecificValue(val)

        // overwrite by new value if source isn't object or array
      } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = extend({}, val)

        // source value and new value is objects both, extending...
      } else {
        target[key] = extend(src, val)
      }
    })
  })

  return target
}

/**
 * Recursive cloning array.
 */
function deepCloneArray (arr) {
  var clone = []
  arr.forEach(function (item, index) {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        clone[index] = deepCloneArray(item)
      } else if (isSpecificValue(item)) {
        clone[index] = cloneSpecificValue(item)
      } else {
        clone[index] = extend({}, item)
      }
    } else {
      clone[index] = item
    }
  })
  return clone
}

function isSpecificValue (val) {
  return !!((
    val instanceof Buffer ||
        val instanceof Date ||
        val instanceof RegExp
  ))
}

function cloneSpecificValue (val) {
  if (val instanceof Buffer) {
    var x = Buffer.alloc(val.length)
    val.copy(x)
    return x
  } else if (val instanceof Date) {
    return new Date(val.getTime())
  } else if (val instanceof RegExp) {
    return new RegExp(val)
  } else {
    throw new Error('Unexpected situation')
  }
}

export const clone = function (obj) {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (obj === null || typeof obj !== 'object') return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}

export { moment }
