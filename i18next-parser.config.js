export default {
  defaultNamespace: "translation",
  lexers: { ts: ["JavascriptLexer"], tsx: ["JsxLexer"], default: ["JavascriptLexer"] },
  locales: ["en", "uk"],
  output: "public/locales/$LOCALE/$NAMESPACE.json",
  input: ["src/**/*.ts", "src/**/*.tsx"],
};
