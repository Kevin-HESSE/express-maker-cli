const beautify = require('js-beautify')

/**
 * Format the content of a file with the help of beautify.
 * @param {String} content Content of a file to format
 * @returns {String} Formatted content.
 */
function formatContent(content) {
  const option = {
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      brace_style: "collapse",
      end_with_newline: true
  }

  return beautify(content, option);
}

module.exports = formatContent;