document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("todo-input");
  const button = document.getElementById("add-btn");
  const list = document.getElementById("todo-list");

  button.addEventListener("click", function () {
    const text = input.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className = "todo-item";

    // 创建 checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";

    // 创建文本
    const span = document.createElement("span");
    span.textContent = text;
    span.className = "todo-text";

    // 创建删除按钮
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "delete-btn";

    // 勾选完成逻辑
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        span.classList.add("completed");
      } else {
        span.classList.remove("completed");
      }
    });

    // 删除逻辑
    delBtn.addEventListener("click", function () {
      list.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
    input.value = "";
  });
});
