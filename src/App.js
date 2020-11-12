import logo from './logo.svg';
import './App.css';
import Kefir from 'kefir';
import { useEffect } from 'react';

const App = () => {

var numbers = Kefir.sequentially(1000, [1, 2, 3]);
var numbers2 = numbers.map(x => x * 2);
var numbers3 = numbers2.filter(x => x !== 4);
numbers.onValue(x => {
  console.log(x);
});
numbers2.onValue(x => {
  console.log(x);
});
console.log('numbers2: ', numbers);


  useEffect(() => {
    console.log('document.querySelector: ', document.querySelector('#ex-2-btn'));
    var btnClicks = Kefir.fromEvents(document.querySelector('#ex-2-btn'), 'click');
    var inputValue = Kefir
      .fromEvents(document.querySelector('#ex-2-input'), 'keyup')
      .map(event => {
        console.log('hi', event.target.value)
        return event.target.value
      });
    var clicksCount = btnClicks.scan(sum => sum + 1, 0);
    var inputNumber = inputValue.map(text => parseInt(text, 10));
    var fixedInputNumber = inputNumber.flatMap(
      x => isNaN(x)
        ? Kefir.constantError('banana?')
        : Kefir.constant(x)
    );
    var theResult = Kefir.combine([fixedInputNumber, clicksCount], (a, b) => a * b);
    var outputElement = document.querySelector('#ex-2-output');

    theResult
      .onValue(x => {
        outputElement.innerHTML = x;
      })
      .onError(error => {
        outputElement.innerHTML = '<span style="color:red">' + error + '</span>';
      });
  }, [])

  return (
    <div className="App">
      <button id="ex-2-btn">Click me</button>
      <input type='text' id='ex-2-input'/>
      <p id='ex-2-output'>x</p>
    </div>
  );
}

export default App;
