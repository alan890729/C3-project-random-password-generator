# 暫時充當備忘錄
- 有測試過可以新增一個js file: /javascripts/script.js，在裡面用動態渲染的方式顯示產生的密碼。所以動態渲染是可行的。所以現在我是有想到兩個版本的最終結果，還沒確認兩者的可行性，1是用動態渲染的方式產生密碼，2是用res.query紀錄user選什麼樣的密碼產生設定，然後弄一個route去顯示產生的密碼。
- 我是打算兩個版本都做做看
## 第一個版本（動態渲染）
- 問題一：如果包含'<'這個符號，產出的密碼沒問題，但是畫面渲染會出問題，<後面的密碼有機會會被截掉。
  例如，產出的密碼是0&$>=T=<NEXz，如果有console.log(password)，會看到console中顯示完整的密碼0&$>=T=<NEXz，但網頁畫面有機會會呈現0&$>=T=。
  我還沒有查到這個問題出現、被觸發的原因，但目前的解法是特殊字元不要包含'<'就沒有顯示跟實質密碼對不上的問題了。
  雖然沒有查到造成的原因，但我猜測應該是跟html用<>作為元素標籤所導致的，但純屬猜測。