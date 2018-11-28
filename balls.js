window.f = document.getElementById('f');
window.b = document.getElementById('b'); // code input
window.d = document.getElementById('d');
window.r = document.getElementById('r');
window.i = document.getElementById('i');
window.o = document.getElementById('o');
window.q = document.getElementById('q');
window.w = document.getElementById('w');


function x(input) {

  input = input.split(' ');

  var c = [];

  for (var jj = 0; jj < input.length; jj++) {
    var word = input[jj].trim().toLowerCase();
    if (word) {
      c.push(word);
    }
  }

  var y = f.i,
    commandsLength = c.length,
    maxInt = 32768,
    data = new Array(maxInt),
    dataPointer = 0,
    k = -1,
    e = new Array(commandsLength),
    l = new Array(commandsLength),
    s = new Array(commandsLength),
    m = 127,
    n = -128
  if (f.q.checked) {
    m = Number.MAX_VALUE;
    n = -(Number.MAX_VALUE)
  }
  for (j = 0; j < maxInt; j++) {
    data[j] = 0
  }
  for (j = 0; j < commandsLength && dataPointer >= 0; j++) {
    if (c[j].indexOf('wait') != -1 || c[j] == '[') {
      l[++dataPointer] = j;
    }
    if (c[j].indexOf('meet') != -1 || c[j] == ']') {
      s[j] = l[dataPointer];
      e[l[dataPointer]] = j;
      dataPointer--
    }
  }
  if (dataPointer != 0) {
    alert("Unbalanced brackets (wait/meet)!");
    return
  }
  for (j = 0; j < commandsLength; j++) {
    if (c[j].indexOf('how') != -1 || c[j] == '#') {
      if (f.d.checked) {
        window.alert('Position within code: ' + j + '\nPointer: ' + dataPointer + '\nValue at pointer: ' + data[dataPointer])
      };
    } else if (c[j].indexOf('bye') != -1 || c[j] == '<') {
      dataPointer--;
      if (dataPointer < 0) dataPointer = maxInt - 1;
    } else if (c[j].indexOf('hi') != -1 || c[j] == '>') {
      dataPointer++;
      if (dataPointer >= maxInt) dataPointer = 0;
    } else if (c[j].indexOf('lea') != -1 || c[j] == '+') {
      if ((data[dataPointer] + 1) > m) data[dataPointer] = n;
      else {
        data[dataPointer]++
      }
    } else if (c[j].indexOf('nods') != -1 || c[j] == '-') {
      if ((data[dataPointer] - 1) < n) data[dataPointer] = m;
      else {
        data[dataPointer]--
      }
    } else if (c[j].indexOf('meet') != -1 || c[j] == ']') {
      j = s[j]-1
    } else if (c[j].indexOf('wait') != -1 || c[j] == '[') {
      if (data[dataPointer] == 0) {
        j = e[j];
      }
    } else if (c[j].indexOf('thanks') != -1 || c[j] == ',') {
      if (k + 1 >= y.value.length) {
        if (!f.r.checked) {
          data[dataPointer] = 0;
          continue
        }
        u = prompt("Input required. Press Cancel to halt program execution.", "")
        if (u == '' || u == null) {
          j = commandsLength;
          continue
        } else {
          y.value += u
        }
      }
      data[dataPointer] = y.value.charCodeAt(++k);
    } else if (c[j].indexOf('sorry') != -1 || c[j] == '.') {
      f.o.value += String.fromCharCode(data[dataPointer])
    } else if (c[j].indexOf('why') != -1) {
      alert('For teh lulz!');
    }
  }
  if (f.w.checked) {
    window.alert("Execution completed.")
  }
} //