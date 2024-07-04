function parseQualifier (property) {
  if (property.includes('-')) {
    const split = property.split('-')
    return {
      property: split[0],
      qualifier: split.slice(1).join('')
    }
  } else {
    return {
      property,
      qualifier: null
    }
  }
}

function propertiesString (list) {
  if (!list || !list.length) {
    return ''
  }
  return list.map(i => parseQualifier(i)).map((i) => {
    let text = i.property
    if (i.qualifier) {
      text += ` ${i.qualifier}`
    }
    return text
  }).join(', ')
}

export default propertiesString
