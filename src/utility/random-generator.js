export function randomStringIdGenerator() {
  return ('xxxxyxxxyxxxx').replace(/[xy]/g, function(char) {
    var rand = Math.random() * 16 | 0; 
    var out = (char == 'x') ? rand : (rand & 0x3 | 0x8);

    return out.toString(16);
  });
}
