// Internal imports

use conquest::models::index::Tile;

mod errors {
    const TILE_NOT_OWNED: felt252 = 'Tile: is not owned';
    const TILE_ALREADY_OWNED: felt252 = 'Tile: already owned';
}

#[generate_trait]
impl TileImpl of TileTrait {
    #[inline]
    fn new(x: i32, y: i32, player_id: felt252) -> Tile {
        Tile { x, y, player_id, time: 0 }
    }

    #[inline]
    fn own(ref self: Tile, player_id: felt252, time: u64) {
        self.player_id = player_id;
        self.time = time;
    }
}

#[generate_trait]
impl TileAssert of AssertTrait {
    #[inline]
    fn assert_not_owned(self: Tile, player_id: felt252) {
        assert(player_id != self.player_id, errors::TILE_ALREADY_OWNED);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Tile, TileTrait};

    // Constants

    const PLAYER_ID: felt252 = 'ID';
    const X: i32 = -7;
    const Y: i32 = 42;

    #[test]
    fn test_tile_new() {
        let tile = TileTrait::new(X, Y, PLAYER_ID);
        assert_eq!(tile.x, X);
        assert_eq!(tile.y, Y);
        assert_eq!(tile.player_id, PLAYER_ID);
    }
}
