var pet = {
  words: '...',
  speak: function (say) {
    console.log(say + ':' + this.words )
  }
};

var dog = {
  words: 'wang'
};

pet.speak.call(dog, 'dogSpeak');
/********************************************/
function Pet (words) {
  this.words = words;
  this.speak = function (say) {
    console.log(say + ':' + this.words)
  }
}

function Dog (words) {
  Pet.call(this, words)
}

var d = new Dog ('speak');
d.speak('wang');