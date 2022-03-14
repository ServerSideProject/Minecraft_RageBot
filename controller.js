const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');

var recursiveAsyncReadLine = function () {
    readline.question("Command: "
        , function (line) {
            try {
                fs.writeFileSync('action.mdd', line)
                    setTimeout(() => {
                        fs.writeFileSync('action.mdd', '')
                }, 100);
            } catch (err) {
                  console.error(err)
            }



            
    recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine(); 