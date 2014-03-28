module.exports = equal_temp();


function equal_temp(seed) {
  acc = {};
  seed = typeof seed !== 'undefined' ? seed : 440.0;
 
  while (seed > 30) {
    seed = seed / 2.0
  }
 
  var notes = ["A", "As","B","C", "Cs", "D", "Ds", "E", "F", "Fs", "G","Gs"];
  var notesindex = 0
 
  while (seed < 20000.00) {
    acc[notes[(notesindex % 12)] + (Math.floor(notesindex/12)) ] = seed;
    seed = seed * Math.pow(2.0, (1.0/12.0));
    notesindex += 1
 }
 return acc
}
