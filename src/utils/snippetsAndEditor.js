var __customSnippets = {
  cl: "console.log();",
  cc: "console.clear();",
  fd: "function name() {\n\n};",
  af: "let foo = () => {};",
  lorem: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ab eveniet ipsa hic quod, ipsam quia quo? Nam consequatur, nostrum ullam consequuntur mollitia ipsa deserunt eaque, ipsam quo sit animi!"`,
  testPrimitives: `console.log(12);
console.log("hello");
console.log(32.5);
console.log(435443n);
console.log(undefined);
console.log(NaN);
console.log(0);
console.log(-0);
console.log(Infinity);
console.log(true);
console.log(null);`,
  obj: `let obj = {
  name: "Karl",
  age: 55,
  job: "Builder",
  location: {
    country: "USA",
    city: "New York"
  },
  hobbies: [ "skiing", "writing poems", "paintning" ]
}`,
  numArr: "let arr = [ 432, 23, 233, 545, 5442, 0, 46554, 2, 132, 3229 ];",
};

export var __editor = CodeMirror.fromTextArea(
  document.getElementById("__inputArea"),
  {
    mode: "javascript",
    tabSize: 2,
    autoCloseBrackets: true,
    autofocus: true,
    matchBrackets: true,
    highlightSelectionMatches: true,
    lineWrapping: true,
    extraKeys: {
      Tab: function (cm) {
        var cursor = cm.getCursor();
        var cur = cm.getRange({ line: cursor.line, ch: 0 }, cursor);
        var word = cm.findWordAt(cursor);
        var curWord = cm.getRange(word.anchor, word.head);
        var snippet = __customSnippets[curWord];
        if (snippet) {
          cm.replaceRange(snippet, word.anchor, word.head);
          if (curWord === "cl") {
            var newCursor = {
              line: cursor.line,
              ch: cursor.ch + snippet.indexOf("(") - 1,
            };
            cm.setCursor(newCursor);
          }
        } else {
          if (cursor.ch === 0 || /^\s+$/.test(cur)) {
            cm.execCommand("indentMore");
          }
        }
      },
    },
  }
);
