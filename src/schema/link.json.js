export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'title': 'sprite workflow schema',
  'description': 'Schema of sprite workflow',
  'type': 'object',
  'properties': {
    'startStepId': 'string',
    'endStepId': 'string',
    'text': 'string',
    'textAttrs': {
      'type': 'object'
    }
  },
  'required': [ 'id' ]
}
