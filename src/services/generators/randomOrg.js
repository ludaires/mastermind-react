import RandomGenerator from './random';

const local = new RandomGenerator();

class RandomOrg {
  async secret() {
    let url = 'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new';
    return fetch(url)
      .then(res => res.text()).then(data => data.split('').filter(e => e !== '\n'))
      .catch((err) => {
        console.log(err);

        // Here I fall back to my own generator. (Circuit-Break)
        // Sometime the Random.org API does not return, I belive
        // that's because of some rate-limit imposed by the website.
        //
        // TODO: Explore using retries and/or Sagas.
        return local.secret();
      });
  }
}

export default RandomOrg;
