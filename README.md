1. What is the difference between var, let, and const?
  A- var: পুরনো JavaScript (ES6 এর আগে) এ বেশি ব্যবহার হত redeclare করা যায় value change করা যায় function scope থাকে var এখন কম ব্যবহার করা হয়।

  B- let: ES6 (2015) এ এসেছে redeclare করা যায় না value change করা যায় block scope থাকে let ব্যবহার করা হয় যখন value পরে change হতে পারে।

  C- const: ES6 (2015) এ এসেছে redeclare করা যায় না value change করা যায় না block scope থাকে const ব্যবহার করা হয় যখন value change হবে না।

2. What is the spread operator (...)?
   Spread operator (...) = array বা object এর ভিতরের value গুলো খুলে অন্য জায়গায় ব্যবহার করা।

3. What is the difference between map(), filter(), and forEach()?

  A- forEach() Array এর প্রতিটি element এর উপর loop চালায়, কিন্তু নতুন array return করে না। সাধারণত loop চালানোর জন্য ব্যবহার হয়।

  B- map() Array এর প্রতিটি element এর উপর কাজ করে এবং একটি নতুন array return করে। map() ব্যবহার হয় যখন array modify করে নতুন array বানাতে হয়।

  C- filter() Condition অনুযায়ী array থেকে কিছু element select করে নতুন array return করে। filter() ব্যবহার হয় যখন condition দিয়ে data বাছাই করতে হয়।

4. What is an arrow function?
   Arrow function = JavaScript-এ function লেখার short and modern way.

5. What are template literals?
   Template literals = backticks ( ) ব্যবহার করে string লেখা এবং ${} দিয়ে variable বা expression বসানো।
