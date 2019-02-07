# Javascript Project Of Javascript Beginners

> [local-storage-version-one-start](https://gist.github.com/robgmerrill/3e67a7e0e09acb5b77648f32bff0568f)

## 實作一個 To do list

### `textContent`: 更改指定節點的文本內容，以及他的後代(變成你更改後的文本內容，所以 child 會被消除掉)

```js
var title = document.querySelector('#title')
    title.textContent = 'Todo Tracker'
/* 用 textContent 更改指定節點的文本內容，以及他的後代(變成你更改後的文本內容，所以 child 會被消除掉) */

// 預設的 title
var defaultTitle = 'My Todo Tracker'
```

### Element 元素的操作

 - `appendChild()`: 在子節點的後面添加一個節點
 - `removeChild()`: 移除一個子節點
 - `createElement()`: 透過標籤名稱建立一個 HTML 的元素
 - `firstChild()`: read-only property，返回一個第一個子節點

```js

'1. 建立一個 li 元素'
var todoItem = document.createElement('li');

'2. 用 HTML DOM 的 textContent 屬性添加文字到元素上'
// notes: 設置了 textContent 屬性，會刪除所有子節點，並被替換為包含指定字符串的一個單獨的文本節點。
todoItem.textContent = 'Go to sleep.';

'3. 將準備好的 li 元素，添加到 ul 之中'
var todoList = document.querySelector('ul');
todoList.appendChild(todoItem)
```

### 將以上的步驟做成一個 function todoMaker

    - 補充資料：
    - [JavaScript Function Definitions](https://www.w3schools.com/js/js_function_definition.asp)

    - [[筆記] 進一步談JavaScript中函式的建立─function statements and function expressions](https://pjchender.blogspot.com/2016/03/javascriptfunction-statements-and.html)

```js

'函式陳述式 function statements(declarations)'
function todoMaker(text) {
    var todoItem = document.createElement('li');
    todoItem.textContent = text;
    todoList = document.querySelector('ul');
    todoList.appendChild(todoItem)
}

'或者是函式表達式 function expressions'
var todoMaker = function() {
    var todoItem = document.createElement('li');
    todoItem.textContent = text;
    todoList = document.querySelector('ul');
    todoList.appendChild(todoItem)
}
```

### 清除全部 todo 的按鈕：利用 while 迴圈清除 todo list。

```js

'4. 移除第一個元素，但是空白的文字節點也是一個節點'
// 移除到空白的文字節點
todoList.removeChild(todoList.firstChild)
// 第二個才移除到第一個 li
todoList.removeChild(todoList.firstChild)

// 利用 while 迴圈
while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
}
```

```js
'選取 .clear 這個 button，然後用剛剛的迴圈來達到 clear all 的效果'

var button = document.querySelector('.clear');

/* clear all button: 添加一個點擊的事件給 clearAll button */
button.addEventListener('click', function() {
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
})

/* 或者是把 function 抽起來使用 */
button.addEventListener('click', clearAll)

function clearAll() {
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}
```

### 表單 form 的相關處理

```js
'form 的相關處理'

'選取表單及輸入框，添加 submit 事件，阻止表單預設 submit 時會刷新頁面這個行為'
'用標籤名選取這個元素'
var formFiled = document.querySelector('form')
var input = document.querySelector('#user-todo')

"e 代表當用戶點擊提交並提交表單時發生的'事件(event)'"
'e.preventDefault(): 防止發生預設的行為'

formFiled.addEventListener('submit', function(e) {
    e.preventDefault()
    
    // 如果沒有輸入內容就 submit 的話，顯示提醒文字，並 return (程式將不會繼續執行下去)
    if(input.value === '') {
        title.textContent = '忘記輸入拉~~~';
        return
    } 

    // 提交成功的話，恢復預測的 title，然後將輸入的 todo 新增到 list 中，最後將 input 中的文字清空
    title.textContent = defaultTitle
    todoMaker(input.value)
    input.value = ''
})
```


### localStorage

> web storage that stores data with no expiration date

心得：作業之一的 todo-list，透過 HTML 與 CSS 做成的 todo-list，來學習有關 DOM 的操作，一切都照著想像中的做動了，但每次刷新頁面之後新增 todo 的資料就會不見了，所以過程中也查了一些方式來儲存資料，開始爬文之後，發現一時間也沒辦法好好吸收，看過 JS30 有關 localStorage 的使用或一些教學文章也搞不太懂，整個過程沒什麼概念，後來看了這個影片的教學之後，過程中學到的基礎都連貫起來了。

目前的心得，HTML 與 CSS 是處理網頁畫面的呈現，要處理資料就得靠 JavaScript 了，而儲存資料這部分，常見的方式有兩種 _localStorage_ 或 _cache_。

- todo 1
- todo 2
- todo 3

todo-list 抽象化的角度來看，你說它是一個陣列或物件都不為過，所以我們用處理陣列的方式來思考吧！

但首先，我們先初步的了解 localStorage 該怎麼使用吧。

```js
    /* example */
    Methods -> setItem(), getItem(), removeItems(), clear()

    '1. 嘗試看看，在 console 輸入以下'
    localStorage -> 返回儲存在 client 端的 data

    '2. localStorage 的 setItem() 方法: 像物件一樣，以 key/value pairs 的方式儲存'
    localStorage.setItem('todos', 'Practice Hello World!') -> 儲存一筆
    localStorage.setItem('todos', 'Make Breakfast') -> 儲存第二筆

    '3. 透過 key 取得 value'
    localStorage.getItem('todos')

    '4. 透過 key 移除一個 key/value pairs'
    localStorage.removeItem('doNotdo')

    '5. 移除全部的 localStorage 的所有內容'
    localStorage.clear()

```

1. 搞定新增的 todo，第一步宣告變數 _todosArray_ 等於一個空陣列來儲存每次輸入的資料，當你把一個 todo-list 做出來的時候，你會知道如何操作 DOM 來取得輸入的資料並呈現在網頁上，所以這裡就只是把你知道如何取得的資料 `push` 到 _todosArray_ 這個陣列裡，轉換成 JSON 格式並使用 `setItem()` 新增到 _localStorage_ 。

```js
var todosArray = []
todosArray.push(input.value)
localStorage.setItem('todos', JSON.stringify(todosArray))

// notes: '將 array 轉換成 JSON'
// var arr = [1, 2, 3, 'Hello World']
// jsonArr = JSON.stringify(arr)
```

但這樣是不夠的，localStorage 確實的儲存你的 todos 了，但是每次刷新網頁的時候，資料又重新被宣告成空陣列了，所以利用三元運算子來判斷 localStorage 是否有儲存資料，如果有資料的話，使用 `getItem()` 取出儲存在 _localStorage_ 裡 JSON 格式的資料，並用 `JSON.parse()` 將資料轉換成原本的陣列。

```js
var todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
/*notes: 判斷 localStorage.getItem('todos') 是否有值，有的話將存入 localStorage 的 JSON 轉成 js，頁面刷新後 localStorage 才會有值 */
```


```js

// 將輸入的值 push 到 todosArray，然後轉成 JSON 格式後存入 localStorage
todosArray.push(input.value)
localStorage.setItem('todos', JSON.stringify(todosArray))

/* 把存入 localStorage 的 JSON 格式的資料解析為 js 並取出來 */
var storage = JSON.parse(localStorage.getItem('todos'));
if(storage) {
    for(let i = 0; i < storage.length; i++) {
        todoMaker(storage[i])
    }
}

```
