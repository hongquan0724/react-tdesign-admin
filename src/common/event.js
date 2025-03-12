

const isArray = Array.isArray


function hasOwnProp (obj, key) {
    return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false
}
function objectEach (obj, iterate, context) {
    if (obj) {
        for (var key in obj) {
            if (hasOwnProp(obj, key)) {
                iterate.call(context, obj[key], key, obj)
            }
        }
    }
}

function arrayEach (list, iterate, context) {
    if (list) {
        if (list.forEach) {
            list.forEach(iterate, context)
        } else {
            for (var index = 0, len = list.length; index < len; index++) {
                iterate.call(context, list[index], index, list)
            }
        }
    }
}

function each (obj, iterate, context) {
    if (obj) {
        return (isArray(obj) ? arrayEach : objectEach)(obj, iterate, context)
    }
    return obj
}
function helperCreateGetObjects (name, getIndex) {
    var proMethod = Object[name]
    return function (obj) {
        var result = []
        if (obj) {
            if (proMethod) {
                return proMethod(obj)
            }
            each(obj, getIndex > 1 ? function (key) {
                result.push(['' + key, obj[key]])
            } : function () {
                result.push(arguments[getIndex])
            })
        }
        return result
    }
}
const keys = helperCreateGetObjects('keys', 1)
function lastArrayEach (obj, iterate, context) {
    for (var len = obj.length - 1; len >= 0; len--) {
        iterate.call(context, obj[len], len, obj)
    }
}
function lastObjectEach (obj, iterate, context) {
    lastArrayEach(keys(obj), function (key) {
        iterate.call(context, obj[key], key, obj)
    })
}


function lastEach (obj, iterate, context) {
    if (obj) {
        return (isArray(obj) ? lastArrayEach : lastObjectEach)(obj, iterate, context)
    }
    return obj
}
function helperDeleteProperty (obj, property) {
    try {
        delete obj[property]
    } catch (e) {
        obj[property] = undefined
    }
}
function isPlainObject (obj) {
    return obj ? obj.constructor === Object : false
}
function handleAssign (destination, args, isClone) {
    var len = args.length
    for (var source, index = 1; index < len; index++) {
        source = args[index]
        arrayEach(keys(args[index]), isClone ? function (key) {
            destination[key] = clone(source[key], isClone)
        } : function (key) {
            destination[key] = source[key]
        })
    }
    return destination
}
var assign = function (target) {
    if (target) {
        var args = arguments
        if (target === true) {
            if (args.length > 1) {
                target = isArray(target[1]) ? [] : {}
                return handleAssign(target, args, true)
            }
        } else {
            return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args)
        }
    }
    return target
}
function clear (obj, defs, assigns) {
    if (obj) {
        var len
        var isDefs = arguments.length > 1 && (defs === null || typeof defs !== 'object')
        var extds = isDefs ? assigns : defs
        if (isPlainObject(obj)) {
            objectEach(obj, isDefs ? function (val, key) {
                obj[key] = defs
            } : function (val, key) {
                helperDeleteProperty(obj, key)
            })
            if (extds) {
                assign(obj, extds)
            }
        } else if (isArray(obj)) {
            if (isDefs) {
                len = obj.length
                while (len > 0) {
                    len--
                    obj[len] = defs
                }
            } else {
                obj.length = 0
            }
            if (extds) {
                obj.push.apply(obj, extds)
            }
        }
    }
    return obj
}
function pluckProperty (name) {
    return function (obj, key) {
        return key === name
    }
}


function remove (obj, iterate, context) {
    if (obj) {
        if (iterate !== null || iterate !== undefined) {
            let removeKeys = []
            let rest = []
            if (typeof iterate !== 'function') {
                iterate = pluckProperty(iterate)
            }
            each(obj, function (item, index, rest) {
                if (iterate.call(context, item, index, rest)) {
                    removeKeys.push(index)
                }
            })
            if (isArray(obj)) {
                lastEach(removeKeys, function (item, key) {
                    rest.push(obj[item])
                    obj.splice(item, 1)
                })
            } else {
                rest = {}
                arrayEach(removeKeys, function (key) {
                    rest[key] = obj[key]
                    helperDeleteProperty(obj, key)
                })
            }
            return rest
        }
        return clear(obj)
    }
    return obj
}


function triggerEvent(evnt) {
    var isWheel = evnt.type
    eventStore.forEach(function (_a) {
        var type = _a.type, cb = _a.cb;
        // 如果被取消冒泡，不再执行
        if (!evnt.cancelBubble) {
            if (type === evnt.type || (isWheel && type === 'mousewheel')) {
                cb(evnt);
            }
        }
    });
}
const eventStore = [];
export const GlobalEvent = {
    on: function (comp, type, cb) {
        eventStore.push({ comp: comp, type: type, cb: cb });
        // console.log(eventStore,'eventStore');
    },
    off: function (comp, type) {
        remove(eventStore, function (item) { return item.comp === comp && item.type === type; });
    },
    remove,
};


window.addEventListener('resize', triggerEvent, false);


