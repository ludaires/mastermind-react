import GameService from './game';
import RandomOrg from './generators/randomOrg';

const initializeGameService = function() {
  const generator = new RandomOrg();
  return new GameService(generator);
};

export default initializeGameService();
