console.log(reversePolishCalc(parse('2+2*5'))); //Введите пример сюда вместо '2+2*5'

function parse(s) {
  const ops = {
    '+': 1,
    '-': 1,
    '/': 2,
    '*': 2
  };

  const stack = [];
  const out = [];

  for (let i = 0; i < s.length;) {
    const c = s[i];

    if (!isNaN(c)) {
      let n = '';
      while (i < s.length && !isNaN(s[i])) {
        n += s[i];
        ++i;
      }

      out.push(n);
    } else if (c in ops) {
      while (ops[seek(stack)] >= ops[c]) {
        out.push(stack.pop());
      }
  
      stack.push(c);
      ++i;
    } else if (c === ')') {
      while (stack.length && seek(stack) !== '(') {
        out.push(stack.pop());
      }
      
      stack.pop();
      ++i;
    } else {
      stack.push(c);
      ++i;
    }  
  }
  
  while (stack.length) {
    out.push(stack.pop());  
  }

  return out;
}

function seek(stack) {
  return stack[stack.length - 1];
}

function reversePolishCalc(tokens) {
  const funcByOperator = {
      '+': (a, b) => b + a,
      '-': (a, b) => b - a,
      '*': (a, b) => b * a,
      '/': (a, b) => b / a,
  };
  
  const stack = []
  
  let last, token
  while (token = tokens.shift()) {
    const func = funcByOperator[token]
    last = func ? func(stack.pop(), stack.pop()) : +token
    stack.push(last)
  }

  return last || 0
}