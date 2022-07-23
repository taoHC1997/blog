# Commander.js 基础学习

- github：
  - https://github.com/tj/commander.js
- npm：
  - https://www.npmjs.com/package/commander
- 文档：
  - https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md

## 快速开始

安装：

```s
npm i commander
```

使用：

```js
const { Command } = require("commander");
const program = new Command();
```

## 示例

### 基础示例

```js
const { Command } = require("commander");
const program = new Command();

program
  // 设置命名，会在帮助信息头部中显示
  .name("my-cli")
  // 设置参数提示，会在帮助信息头部中显示
  .usage("[global options] command")
  // 设置描述信息，会在帮助信息列表显示
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0")
  .action(() => {
    console.log("Hello World!");
  });

// something ...

program.parse();

// 有一个
program.parseAsync();
```

下面是基础选项的扩展：

```js
// version 扩展
program.version("0.0.1", "-v, --vers", "output the current version");
```

### 命令扩展示例

```js
program
  // 配置命令，注意有 .addCommand() 差不多
  .command("show")
  .description("Show Something")
  // 配置主要参数，如果是 [string] 表示可选
  .argument("<string>", "string to show", "default")
  // 配置参数处理函数
  .argument("[second]", "integer argument", myParseInt, 1000)
  // 如果配置可变参数列表，必须是最后一个
  .argument("<dirs...>")
  // 配置布尔值，有则为 true
  .option("-a", "A")
  // 配置布尔值，有则为 false
  .option("--no-a", "A")
  // 设置 命令辅助参数、描述、默认值
  .option("-s, --say <char>", "say other", "anything")
  // 设置必填选项
  .requiredOption("-c <type>", "C")
  // 设置多参数选项，命令中使用 ` -- ` 分隔
  .option("-n <numbers...>", "specify numbers")
  // 设置参数预函数处理，可追加一个默认参数，类似 reduce
  .option(
    "-d <value>",
    "do for value",
    (val, dummyPrevious) => {
      return dummyPrevious + val;
    },
    5
  )
  // 修改此命令 -h 参数
  .helpOption("-e, --HELP", "read more information")
  // 修改此命令 help 参数，原为 help
  .addHelpCommand("assist [command]", "show assistance")
  .action((string, second, dirs, options, command) => {
    // 在 Commander 7 以前，选项的值是作为属性存储在命令对象上的，此处仅作说明
    console.log(string);
    console.log(second);
    console.log(dirs);
    console.log(options);
    console.log(command);
  });
```

`command` 可配置参数：

```js
// 还有一个子命令参数
program
  .command("a", {
    // 配置无参数时的默认执行
    isDefault: true,
    // 配置是否打印帮助时显示
    hidden: true,
  })
  .description("A")
  .action(() => {});
```

`argument` 可自行构造：

```js
program
  .addArgument(
    new commander.Argument("<drink-size>", "drink cup size").choices(["small", "medium", "large"])
  )
  .addArgument(new commander.Argument("[timeout]", "timeout in seconds").default(60, "one minute"));
```

`option` 可自行构造：

```js
program
  // 隐藏帮助
  .addOption(new Option("-s, --secret").hideHelp())
  // 设置默认值及其备注
  .addOption(new Option("-t, --timeout <delay>", "timeout in seconds").default(60, "one minute"))
  // 设置参数可选选项
  .addOption(new Option("-d, --drink <size>", "drink size").choices(["small", "medium", "large"]));
```

### 参数处理示例

#### 数量验证

使用 `.allowUnknownOption()` 对 `.allowExcessArguments(false)` 过多的参数进行数量验证

#### 获取处理

```js
// 在 parse 以后这样获取，否则是 action 智能处理

// 获取命令行后参数
const options = program.opts();
// 获取没有被用过的参数
const unusedOptions = program.args;

// 对应  --debug 无参数
if (options.debug) console.log(options);
// 对应 --pizza-type=cheese 代码中转驼峰
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
```

### 命令生命周期

```js
program
  .option("-p", "show how long command takes")
  // 可多个
  .hook("preAction", (thisCommand, actionCommand) => {
    // 在本命令或其子命令的处理函数执行前
  })
  .hook("postAction", (thisCommand, actionCommand) => {
    // 在本命令或其子命令的处理函数执行后
  });
```

### 帮助信息

> 默认既有帮助命令，有部分设置见其他示例

```js
// 配置默认列表的格式
program.configureHelp({
  // 设置宽度
  helpWidth: 20,
  // 以字母序排列子命令
  sortSubcommands: true,
  // 以字母序排列选项
  sortOptions: true,
  // 仅显示名称
  subcommandTerm: (cmd) => cmd.name(),
});

// 设置全局帮助信息模板，这里第一个参数对应：
// beforeAll：作为全局标头栏展示
// before：在内建帮助信息之前展示
// after：在内建帮助信息之后展示
// afterAll：作为全局末尾栏展示
program.addHelpText(
  "after",
  `
Examples:
  $ custom-help --help
  $ custom-help -h`
);

// 设置错误情况下的帮助信息显示
program.showHelpAfterError("(add --help for additional information)");

// 展示帮助信息并退出。可以通过传入 { error: true } 来让帮助信息从 stderr 输出，并以代表错误的状态码退出程序
command.help();

// 只展示帮助信息，不退出程序。传入 { error: true } 可以让帮助信息从 stderr 输出
command.outputHelp();

// 得到字符串形式的内建的帮助信息，以便用于自定义的处理及展示
command.helpInformation();
```

### 独立子命令建立

> 当 `.command()` 带有描述参数时，就意味着使用独立的可执行文件作为子命令。 Commander 将会尝试在入口脚本（例如 `./examples/pm` ）的目录中搜索 `program-command` 形式的可执行文件，配置 `executableFile` 可以自定义名字

```js
program
  .name("pm")
  .version("0.0.1")
  .description("Fake package manager")
  .command("install [name]", "install one or more packages")
  .alias("i")
  .command("search [query]", "search with optional query")
  .alias("s")
  .command("update", "update installed packages", { executableFile: "myUpdateSubCommand" })
  .command("list", "list packages installed", { isDefault: true });
```

如果是 TypeScript ，构建子命令请使用 `node -r ts-node/register pm.ts`

### 事件流

```js
// output help information on unknown commands
program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

// add some useful info on help
program.on("--help", () => {
  console.log();
  console.log(`  Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of given command.`);
  console.log();
});
```
