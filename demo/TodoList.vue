<template>
  <div class="todo-app">
    <h1>{{ title }}</h1>
    <div class="add-from">
      <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="Todo"
        v-model="nowText"
        @keyup.enter="addTodo"
      />
      <button class="add-btn" @click="addTodo">添加</button>
    </div>
    <div>
      <h2>未完成</h2>
      <ul class="item-list">
        <li
          class="completed"
          v-for="(todo, index) in doing"
          :key="'todo-' + index"
        >
          <span>{{ todo.text }}</span>
          <button @click="doneThis(todo)">完成</button>
        </li>
      </ul>
    </div>
    <div>
      <h2>已完成</h2>
      <ul class="item-list">
        <li
          class="completed"
          v-for="(todo, index) in done"
          :key="'done-' + index"
        >
          <del>{{ todo.text }}</del>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      title: "Todo List",
      // 默认列表
      todoList: [
        {
          text: "未完成",
          done: false,
        },
        {
          text: "已完成",
          done: true,
        },
      ],
      // 当前添加框文字
      nowText: "",
    };
  },
  methods: {
    addTodo() {
      this.todoList.unshift({
        text: this.nowText,
        done: false,
      });
      this.nowText = "";
    },
    doneThis(todo) {
      // console.log(todo);
      todo.done = true;
    },
  },
  computed: {
    doing: function () {
      return this.todoList.filter(function (todo) {
        return !todo.done;
      });
    },
    done: function () {
      return this.todoList.filter(function (todo) {
        return todo.done;
      });
    },
  },
};
</script>

<style lang="scss" type="text/css">
.todo-app {
  box-shadow: 3px 3px 5px 6px #ccc;
  max-width: 600px;
  min-height: 400px;
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  // background-color: cadetblue;
  h1 {
    text-align: center;
  }
  .add-from {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    .add-input {
      font-size: 18px;
      line-height: 20px;
      flex-basis: 60%
    }
    .add-btn {
      display: inline-block;
      height: 100%;
      flex-basis: 30%
    }
  }
  .item-list li {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    button {
      width: 120px;
    }
  }
}
</style>
