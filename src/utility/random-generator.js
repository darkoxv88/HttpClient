export function randomStringIdGenerator() {
  return 'xxxx-xxxx-xxxx-yxxx-xxxx-xxxx-xxxx-yxxx'.replace(/[xy]/g, function(char) {
    var rand = Math.random() * 16 | 0; 
    var out = (char == 'x') ? rand : (rand & 0x3 | 0x8);

    return out.toString(16);
  });
}
