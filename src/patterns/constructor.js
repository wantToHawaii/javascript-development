function Note (title = '', description = '', keywords = []) {
  this.title = title
  this.description = description
  this.keywords = keywords
  this.status = 'todo'
  this.created_at = (new Date()).toISOString()
  this.id = Date.now()
}

Note.prototype.addTitle = function (title = '') {
  this.title = title
}

Note.prototype.addDescription = function (description = '') {
  this.description = description
}

Note.prototype.addKeyword = function (keyword) {
  this.keywords.push(keyword)
}

Note.prototype.removeKeyword = function (keyword) {
  this.keywords = this.keywords.filter(k => k !== keyword)
}

export { Note }
