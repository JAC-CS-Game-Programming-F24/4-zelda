import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import GameStateName from '../../enums/GameStateName.js';
import { stateMachine, timer } from '../../globals.js';
import Dungeon from '../../objects/Dungeon.js';
import UserInterface from '../../services/UserInterface.js';

export default class PlayState extends State {
	constructor() {
		super();

		this.player = new Player();
		this.dungeon = new Dungeon(this.player);
		this.userInterface = new UserInterface(this.player);
	}

	enter() {
		this.player.reset();
		this.dungeon = new Dungeon(this.player);
	}

	update(dt) {
		this.dungeon.update(dt);
		timer.update(dt);

		if (this.player.isDead) {
			stateMachine.change(GameStateName.GameOver);
		}
	}

	render() {
		this.dungeon.render();
		this.userInterface.render();
	}
}
