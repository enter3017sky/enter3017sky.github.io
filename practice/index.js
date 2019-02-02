document.addEventListener('DOMContentLoaded', function() {
    var col = document.querySelectorAll('.col')
    for (let i = 1; i <= col.length - 1; i++) {
      const elem = col[i]
      var result = ''
      var num = i + 1
      for (let j = 1; j <= 9; j++) {
        if (j === 1) {
          result += `<div class="content"><div class="col__title">${num}</div>`
        }
        if (j === 4) {
          result += `</div>
          <div class="content">`
        }
        result += `<div class="items">${num} × ${j} ＝ ${num * j}</div>`
        if (j === 9) {
          result += `</div>`
        }
      }
      elem.innerHTML += result
    }
})