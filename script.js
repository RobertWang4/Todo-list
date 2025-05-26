document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("todo-input");
  const button = document.getElementById("add-btn");
  const list = document.getElementById("todo-list");

  // 🧠 从本地加载 todos
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    list.innerHTML = ""; // 清空列表

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.className = "todo-checkbox";

      const span = document.createElement("span");
      span.textContent = todo.text;
      span.className = "todo-text";
      if (todo.completed) {
        span.classList.add("completed");
      }

      // ✏️ 双击进入编辑模式
      span.addEventListener("dblclick", () => {
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = todo.text;
        inputEdit.className = "input";
        li.replaceChild(inputEdit, span);
        inputEdit.focus();

        // 保存编辑结果
        function saveEdit() {
          const newText = inputEdit.value.trim();
          if (newText) {
            todo.text = newText;
            saveTodos();
          }
          renderTodos();
        }

        inputEdit.addEventListener("blur", saveEdit);
        inputEdit.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            saveEdit();
          }
        });
      });


      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.className = "delete-btn";

      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
        renderTodos();
      });

      delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  button.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    todos.push({ text: text, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
  });

  // 🔁 初次加载页面时显示
  renderTodos();
});
