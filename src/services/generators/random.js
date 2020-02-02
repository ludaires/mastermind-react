const LENGTH = 4;
const DIGITS = [..."01234567"];

class RandomGenerator {
  generate(length) {
    let numbers = [];
    for (let i = 0; i < length; i++) {
      numbers.push(DIGITS[Math.floor(Math.random() * DIGITS.length)])
    }

    return numbers;
  };

  async secret() {
    return this.generate(LENGTH);
  }
}

export default RandomGenerator;
