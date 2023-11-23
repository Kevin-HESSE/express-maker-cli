import beautify, { JSBeautifyOptions } from 'js-beautify';

/**
 * Format the content of a file with the help of beautify.
 * @param {String} content Content of a file to format
 * @returns {String} Formatted content.
 */
export function formatContent(content: string): string {
  const option: JSBeautifyOptions = {
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      brace_style: "collapse",
      end_with_newline: true
  }

  return beautify(content, option);
}
