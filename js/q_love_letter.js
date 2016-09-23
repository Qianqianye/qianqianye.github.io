      var n = 0;
      // An array of Strings
      var options = ['"I would like to walk around in your mind some day."',
      '"In statistics, the Q-function is the tail probability of the standard normal distribution."',
      '"You are people but you are a special kind of people."',
      '"I like your anxiety [sic]. Period." -- An anonymous poet',
      '"You are sweet, like 0 - - - - - - - | - 10."',
      '"I know I am unloveable, You dont have to tell me."'];

      // Every one second execute a function
      setInterval(changeText, 1200);
       
      // This function shows a new piece of text from the array
      function changeText() {
        // increment n
        n++;
        
        // check if n is past end of array and return to beginning
        if (n >= options.length) {
          n = 0;
        }

        // grab element and change src
        var elt = document.getElementById('someText');
        elt.innerHTML = options[n];
      }