const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    if(!a) {
        return res.status(400).send('Please provide "a" variable');
    }

    if(!b) {
        return res.status(400).send('Please provide "b" variable');
    }

    const c = Number(a) + Number(b);

    res.send(`The sum of ${Number(a)} and ${Number(b)} is ${c}.`);
});

app.get('/cipher', (req, res) => {
    const text = req.query.text.toUpperCase();
    const shift = req.query.shift;
    const textArr = text.split('');

    if(!text) {
        return res.status(400).send('Please provide the "text" variable');
    }

    if(!shift) {
        return res.status(400).send('Please provide the "shift" variable');
    }

    for(let i = 0; i < textArr.length; i++) {
        let charCode = textArr[i].charCodeAt(0);
        textArr[i] = String.fromCharCode(((charCode + Number(shift) - 65) % 26) + 65);
    }
    let  newText = textArr.join('');
    res.send(newText);
});


app.get('/lotto', (req,res) => {
    if (req.query.numbers.length === 6) {
      let numbers = req.query.numbers.map(num => Number(num));
      const lotto = [...Array(6)].map(x => Math.ceil(Math.random()*20));
      const dupLotto = [...lotto];
  
      let count = 0;
      let msg;
      numbers.forEach(num => {
        const index = dupLotto.findIndex(lottoNum => lottoNum === num);
        if (index !== -1) {
          count++;
          dupLotto.splice(index, 1);
        }
      });
  
      if (count < 4) {
        msg = 'You win nothing';
      } else if (count === 4) {
        msg = 'You win a free ticket!';
      } else if (count === 5) {
        msg = 'You win $100!';
      } else {
        msg = 'Holy banana boats, you won 1M dollars!';
      }
  
      res.status(200).send(`
        Your Numbers: ${numbers}
        Lotto Numbers: ${lotto}
        Result: You had ${count} matches - ${msg}
        `);
    } else {
      res.status(400).send(`expected 6 numbers, got ${req.query.numbers.length}`);
    }
  }); 
 