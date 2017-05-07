function learn (something) {
  console.log(something)
}
function we (callback, something) {
  something += '123';
  callback(something)
}

we(learn, 'hello world!');
