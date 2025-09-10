// MarkdownPlus.js
// Markdown but better. Usage: MarkdownPlus.parse()

const MarkdownPlus = (() => {
  const styleMap = {
    font: "font-family",
    color: "color",
    size: "font-size",
    bgcolor: "background-color",
  };

  const loadedFonts = new Set();

  function loadFont(url) {
    if (url.includes("fonts.googleapis.com")) {
      if (!loadedFonts.has(url)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
        loadedFonts.add(url);
      }
      const match = url.match(/family=([^:&]+)/);
      return match ? decodeURIComponent(match[1]).replace(/\+/g, " ") : "CustomFont";
    }

    const fontName = "Font" + (loadedFonts.size + 1);
    if (!loadedFonts.has(url)) {
      const style = document.createElement("style");
      style.textContent = `
        @font-face {
          font-family: '${fontName}';
          src: url('${url}');
        }
      `;
      document.head.appendChild(style);
      loadedFonts.add(url);
    }
    return fontName;
  }

  // Escape placeholders for parsing
  function escapePlaceholders(text) {
    return text
      .replace(/\\%/g, "__ESCAPED_PERCENT__")
      .replace(/\\\*\*\*/g, "__ESCAPED_TRIPLE_STAR__")
      .replace(/\\___/g, "__ESCAPED_TRIPLE_UNDER__");
  }

  function unescapePlaceholders(text) {
    return text
      .replace(/__ESCAPED_PERCENT__/g, "%")
      .replace(/__ESCAPED_TRIPLE_STAR__/g, "***")
      .replace(/__ESCAPED_TRIPLE_UNDER__/g, "___");
  }

  function preprocessUnderline(text) {
    return text.replace(/(\*\*\*|___)(.+?)\1/g, (match, wrapper, content) => {
      return `<span style="text-decoration:underline">${content}</span>`;
    });
  }

  function preprocess(text) {
    text = escapePlaceholders(text);

    const stack = [];
    let output = "";
    let lastIndex = 0;
    let autoClear = true;

    const regex = /%([^%]+)%/g; // Already escaped %, so safe
    let match;

    while ((match = regex.exec(text)) !== null) {
      output += text.slice(lastIndex, match.index);
      lastIndex = regex.lastIndex;

      const cmdText = match[1].trim();
      if (/^clear(:.*)?$/i.test(cmdText)) {
        output += "</span>".repeat(stack.length);
        stack.length = 0;
        continue;
      }

      const parts = cmdText.split(",");
      let styles = [];

      for (let part of parts) {
        let [key, val] = part.split(":").map(s => s && s.trim());
        if (!key) continue;
        key = key.toLowerCase();

        if (key === "clears") {
          if (val?.toLowerCase() === "onclear") autoClear = true;
          if (val?.toLowerCase() === "off") autoClear = false;
          continue;
        }

        const styleProp = styleMap[key];
        if (styleProp && val) {
          if (key === "size" && !val.endsWith("px")) val += "px";

          if (key === "font") {
            if (/^https?:\/\//.test(val)) {
              // Load font from URL
              val = loadFont(val);
            } else {
              // Wrap plain font names with quotes if they contain spaces
              if (val.includes(" ")) val = `'${val}'`;
            }
          }

          styles.push(`${styleProp}:${val}`);
        }

      }

      if (styles.length > 0) {
        output += `<span style="${styles.join(";")}">`;
        stack.push("span");
      } else {
        output += match[0];
      }
    }

    output += text.slice(lastIndex);

    if (autoClear && stack.length > 0) {
      output = output
        .split("\n")
        .map(line => (stack.length > 0 ? line + "</span>".repeat(stack.length) : line))
        .join("\n");
    } else if (!autoClear && stack.length > 0) {
      output += "</span>".repeat(stack.length);
    }

    return unescapePlaceholders(output);
  }

  function parse(text) {
    const escapedText = escapePlaceholders(text);
    const htmlWithStyles = preprocess(withUnderline);
    const withUnderline = preprocessUnderline(escapedText);
    return marked.parse(htmlWithStyles);
  }

  return { preprocess, parse };
})();