function fuzzy_match(text, search) {
  var search = search.replace(/\ /g, "").toLowerCase();
  var tokens = [];
  var search_position = 0;

  for (var n = 0; n < text.length; n++) {
    var text_char = text[n];
    if (
      search_position < search.length &&
      text_char.toLowerCase() == search[search_position]
    ) {
      text_char = "<b>" + text_char + "</b>";
      search_position += 1;
    }
    tokens.push(text_char);
  }
  if (search_position != search.length) {
    return "";
  }
  return tokens.join("");
}

export default fuzzy_match;
