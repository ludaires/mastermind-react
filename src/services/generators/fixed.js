class Fixed {
  constructor(numbers) {
    this.numbers = numbers;
  }

  async secret() {
    return this.numbers;
  }
}

export default Fixed;
