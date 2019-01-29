export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'title': 'sprite workflow schema',
  'description': 'Schema of sprite workflow',
  'type': 'object',
  'properties': {
    'selector': {
      'type': 'string'
    },
    'size': {
      'type': 'array',
      'items': {
        'type': 'number'
      }
    }
  },
  'required': [
    'selector',
    'size'
  ],
  'dependencies': {}
}
