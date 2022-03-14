# Inquirer.js 基础学习

- github：
  - https://github.com/SBoudrias/Inquirer.js
- npm：
  - https://www.npmjs.com/package/inquirer

## 快速开始

```s
npm i inquirer
```

```js
var inquirer = require("inquirer");
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
```

## api

### 方法

- 一系列问题表单（问问题）
  - `inquirer.prompt(questions, answers) : promise`
- 注册提示插件
  - `inquirer.registerPrompt(name, prompt)`
- 创建独立询问（单问题）
  - `inquirer.createPromptModule() : prompt function`

### question 接口定义

```js
{
  // 类型： 'input'|'number'|'confirm'|'list'|'rawlist'|'expand'|'checkbox'|'password'|'editor' ，默认 input
  type?: string | undefined;
  // 命名（应该是唯一值）
  name?: KeyUnion<T> | undefined;
  // 打印的问题信息
  message?: AsyncDynamicQuestionProperty<string, T> | undefined;
  // 默认答案
  default?: AsyncDynamicQuestionProperty<any, T> | undefined;
  // 选项，配合 type:list
  choices?: Array|Function;
  // 一页显示多少选项设置，配合 choices
  pageSize?: Number;
  // 启用列表循环，配合 choices ，默认开启
  loop?: Boolean;
  // 答案验证
  validate?(input: any, answers?: T): boolean | string | Promise<boolean | string>;
  // 过滤，返回处理后的值
  filter?(input: any, answers: T): any;
  // 值转传给用户的样子
  transformer?: Function;
  // 根据返回值判断是否提出此问题
  when?: AsyncDynamicQuestionProperty<boolean, T> | undefined;
  // message 前缀
  prefix?: string | undefined;
  // message 后缀
  suffix?: string | undefined;
  // 如果已有答案，提示此信息
  askAnswered?: boolean;
}
```

- `input` 输入框
- `number` 数组框
- `confirm` 确认框
- `list` 列表
- `rawlist` 有序列表
- `expand` 扩展，输入关键字等同输入对应值，也可给列表配置快捷键
- `checkbox` 复选框
- `password` 密码
- `editor` 创建临时文件写入

### 其他

#### 表单分隔线

`new inquirer.Separator()`

#### 底部 ui

```js
var ui = new inquirer.ui.BottomBar();

// pipe a Stream to the log zone
outputStream.pipe(ui.log);

// Or simply write output
ui.log.write("something just happened.");
ui.log.write("Almost over, standby!");

// During processing, update the bottom bar content to display a loader
// or output a progress bar, etc
ui.updateBottomBar("new bottom bar content");
```

#### 高级：流式询问

- https://github.com/ReactiveX/rxjs

```js
var prompts = new Rx.Subject();
inquirer.prompt(prompts);

// At some point in the future, push new questions
prompts.next({
  /* question... */
});
prompts.next({
  /* question... */
});

// When you're done
prompts.complete();
```

## 插件

- 自动完成
  - https://github.com/mokkabonna/inquirer-autocomplete-prompt
- 复选框列表
  - https://github.com/faressoft/inquirer-checkbox-plus-prompt
- 日期组件（支持本地化）
  - https://github.com/haversnail/inquirer-date-prompt
- 日期组件
  - https://github.com/DerekTBrown/inquirer-datepicker-prompt
- 提示选择数组选项的索引
  - https://github.com/adam-golab/inquirer-select-line
- 模糊目录选择
  - https://github.com/adelsz/inquirer-fuzzy-path
- emoji 扩展
  - https://github.com/tannerntannern/inquirer-emoji
- 颜色扩展
  - https://github.com/LitoMore/inquirer-chalk-pipe
- 复选框查询扩展
  - https://github.com/clinyong/inquirer-search-checkbox
- 列表查询扩展
  - https://github.com/robin-rpr/inquirer-search-list
- 自动提示扩展
  - https://github.com/olistic/inquirer-prompt-suggest
- 自动补齐扩展
  - https://github.com/yaodingyd/inquirer-autosubmit-prompt
- 文件树扩展
  - https://github.com/anc95/inquirer-file-tree-selection
- 表格扩展
  - https://github.com/eduardoboucas/inquirer-table-prompt

## 示例

### question 示例

#### type 示例

##### input

```js
const chalk = require("chalk");
const questions = [
  {
    type: "input",
    name: "first_name",
    message: "What's your first name",
  },
  {
    type: "input",
    name: "last_name",
    message: "What's your last name",
    default() {
      return "Doe";
    },
  },
  {
    type: "input",
    name: "fav_color",
    message: "What's your favorite color",
    transformer(color, answers, flags) {
      // 注意引入了 chalk
      const text = chalk(color)(color);
      if (flags.isFinal) {
        return text + "!";
      }
      return text;
    },
  },
  {
    type: "input",
    name: "phone",
    message: "What's your phone number",
    validate(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return "Please enter a valid phone number";
    },
  },
];
```

##### list

```js
const questions = [
  {
    type: "list",
    name: "theme",
    message: "What do you want to do?",
    choices: [
      "Order a pizza",
      "Make a reservation",
      new inquirer.Separator(),
      "Ask for opening hours",
      {
        name: "Contact support",
        disabled: "Unavailable at this time",
      },
      "Talk to the receptionist",
    ],
  },
  {
    type: "list",
    name: "size",
    message: "What size do you need?",
    choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
    filter(val) {
      return val.toLowerCase();
    },
  },
];
```

##### rawlist

```js
const questions = [
  {
    type: "rawlist",
    name: "theme",
    message: "What do you want to do?",
    choices: [
      "Order a pizza",
      "Make a reservation",
      new inquirer.Separator(),
      "Ask opening hours",
      "Talk to the receptionist",
    ],
  },
  {
    type: "rawlist",
    name: "size",
    message: "What size do you need",
    choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
    filter(val) {
      return val.toLowerCase();
    },
  },
];
```

##### expand

```js
const questions = [
  {
    type: "expand",
    message: "Conflict on `file.js`: ",
    name: "overwrite",
    choices: [
      {
        key: "y",
        name: "Overwrite",
        value: "overwrite",
      },
      {
        key: "a",
        name: "Overwrite this one and all next",
        value: "overwrite_all",
      },
      {
        key: "d",
        name: "Show diff",
        value: "diff",
      },
      new inquirer.Separator(),
      {
        key: "x",
        name: "Abort",
        value: "abort",
      },
    ],
  },
];
```

##### checkbox

```js
const questions = [
  {
    type: "checkbox",
    message: "Select toppings",
    name: "toppings",
    choices: [
      new inquirer.Separator(" = The Meats = "),
      {
        name: "Pepperoni",
      },
      {
        name: "Ham",
      },
      {
        name: "Ground Meat",
      },
      {
        name: "Bacon",
      },
      new inquirer.Separator(" = The Cheeses = "),
      {
        name: "Mozzarella",
        // 设置默认值
        checked: true,
      },
      {
        name: "Cheddar",
      },
      {
        name: "Parmesan",
      },
      new inquirer.Separator(" = The usual ="),
      {
        name: "Mushroom",
      },
      {
        name: "Tomato",
      },
      new inquirer.Separator(" = The extras = "),
      {
        name: "Pineapple",
      },
      {
        name: "Olives",
        disabled: "out of stock",
      },
      {
        name: "Extra cheese",
      },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return "You must choose at least one topping.";
      }
      return true;
    },
  },
];
```

##### confirm

```js
const questions = [
  {
    type: "confirm",
    name: "toBeDelivered",
    message: "Is this for delivery?",
    default: false,
  },
];
```

##### password

```js
const requireLetterAndNumber = (value) => {
  if (/\w/.test(value) && /\d/.test(value)) {
    return true;
  }
  return "Password need to have at least a letter and a number";
};
const questions = [
  {
    type: "password",
    message: "Enter a password",
    name: "password1",
    validate: requireLetterAndNumber,
  },
  {
    type: "password",
    message: "Enter a masked password",
    name: "password2",
    mask: "*",
    validate: requireLetterAndNumber,
  },
];
```

##### editor

```js
const questions = [
  {
    type: "editor",
    message: "写下你想写的东西：",
    name: "editor",
  },
];
```

#### 其他参数示例

##### filter

```js
{
  /* Preferred way: with promise */
  filter() {
    return new Promise(/* etc... */);
  },
}
```

##### validate

```js
{
  /* Legacy way: with this.async */
  validate: function (input) {
    // Declare function as asynchronous, and save the done callback
    var done = this.async();
    // Do async stuff
    setTimeout(function() {
      if (typeof input !== 'number') {
        // Pass the return value in the done callback
        done('You need to provide a number');
        return;
      }
      // Pass the return value in the done callback
      done(null, true);
    }, 3000);
  }
}
```

##### when

```js
function likesFood(aFood) {
  return function (answers) {
    return answers[aFood];
  };
}

const questions = [
  {
    type: "confirm",
    name: "bacon",
    message: "Do you like bacon?",
  },
  {
    type: "input",
    name: "favorite",
    message: "Bacon lover, what is your favorite type of bacon?",
    when(answers) {
      return answers.bacon;
    },
  },
  {
    type: "confirm",
    name: "pizza",
    message: "Ok... Do you like pizza?",
    when(answers) {
      return !likesFood("bacon")(answers);
    },
  },
  {
    type: "input",
    name: "favorite",
    message: "Whew! What is your favorite type of pizza?",
    when: likesFood("pizza"),
  },
];
```

#### 子进程

```js
const { spawn } = require("child_process");

spawn("node", ["input.js"], {
  cwd: __dirname,
  stdio: "inherit",
});
```
