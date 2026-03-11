const htmlElement = (arr) => {
  const element = arr.map(data => `<span class= "btn"> ${data}</span>`);
  console.log(element.join());
}

const arr = ["saKib", "raKib", "faKib"];
htmlElement(arr)

// here we can see if we want a array to make a string then we can use
// join() - method
// array element ke grp of html Element create korTe paRi dynamically
