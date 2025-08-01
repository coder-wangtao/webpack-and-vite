// LISP 代码： (add 2 (subtract 4 2))
// C    代码  add(2, subtract(4, 2))
// 将lisp代码转化成C代码

// 1.Parsing
// 1.1词法分析
// 词法分析是使用tokenizer(分词器)或者lexer(词法分析器)，将源码拆分成tokens，tokens是一个放置对象的数组，
// 其中的每一个对象都可以看做是一个单元（数字，标签，标点，操作符...）的描述信息。
[
  { type: "paren", value: "(" },
  { type: "name", value: "add" },
  { type: "number", value: "2" },
  { type: "paren", value: "(" },
  { type: "name", value: "subtract" },
  { type: "number", value: "4" },
  { type: "number", value: "2" },
  { type: "paren", value: ")" },
  { type: "paren", value: ")" },
];
// 1.2 语法解析
// 则是将tokens重新整理成语法相互关联的表达形式 ，这种表达形式一般被称为中间层或者AST（抽象语法树）。
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params:
      [{
        type: 'NumberLiteral',
        value: '2',
      },
      {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
  }]
}

// 2.Transformation
// 这个过程主要是改写AST（抽象语法树），或者根据当前AST（抽象语法树）生成一个新的AST（抽象语法树），这个过程可以是相同语言，
// 或者可以直接将AST（抽象语法树）翻译为其他语言。
// 2.1我们是想将 lisp 语言转化为 C 语言，因此需要构建一个新的AST（抽象语法树），这个创建的过程就需要遍历这个“树”的节点并读取其内容，
// 由此引出 Traversal(遍历) 和 Visitors (访问器)。
// 2.2 Traversal(深度优先原则) 和 Visitors (访问器最基本的思想是创建一个“访问器”对象，这个对象可以处理不同类型的节点函数)

// 3.Code Generation
//其实就是将生成的新AST树再转回代码的过程，