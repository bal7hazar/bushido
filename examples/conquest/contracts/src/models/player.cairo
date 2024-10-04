// Internal imports

use conquest::models::index::Player;

mod errors {
    const PLAYER_NOT_CREATED: felt252 = 'Player: does not exist';
    const PLAYER_ALREADY_CREATED: felt252 = 'Player: already exist';
    const PLAYER_INVALID_NAME: felt252 = 'Player: invalid name';
}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    #[inline]
    fn new(id: felt252, name: felt252) -> Player {
        // [Check] Name is valid
        assert(name != 0, errors::PLAYER_INVALID_NAME);
        // [Return] Player
        Player { id, name, counter: 0 }
    }

    #[inline]
    fn conquest(ref self: Player) {
        self.counter += 1;
    }
}

#[generate_trait]
impl PlayerAssert of AssertTrait {
    #[inline]
    fn assert_is_created(self: Player) {
        assert(0 != self.name, errors::PLAYER_NOT_CREATED);
    }

    #[inline]
    fn assert_not_created(self: Player) {
        assert(0 == self.name, errors::PLAYER_ALREADY_CREATED);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Player, PlayerTrait};

    // Constants

    const ID: felt252 = 'ID';
    const PLAYER_NAME: felt252 = 'Alice';
    const PLAYER_NEW_NAME: felt252 = 'Bob';

    #[test]
    fn test_player_new() {
        let player = PlayerTrait::new(ID, PLAYER_NAME);
        assert_eq!(player.id, ID);
        assert_eq!(player.name, PLAYER_NAME);
    }
}
