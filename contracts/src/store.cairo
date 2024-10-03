//! Store struct and component management methods.

// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Models imports

use bushido::models::index::{GameStore, AchievementStore};
use bushido::models::game::Game;
use bushido::models::achievement::Achievement;

// Structs

#[derive(Copy, Drop)]
struct Store {
    world: IWorldDispatcher,
}

// Implementations

#[generate_trait]
impl StoreImpl of StoreTrait {
    #[inline]
    fn new(world: IWorldDispatcher) -> Store {
        Store { world: world }
    }

    #[inline]
    fn get_game(self: Store, world_id: felt252, namespace: felt252) -> Game {
        GameStore::get(self.world, world_id, namespace)
    }

    #[inline]
    fn get_achievement(
        self: Store, world_id: felt252, namespace: felt252, id: felt252
    ) -> Achievement {
        AchievementStore::get(self.world, world_id, namespace, id)
    }

    #[inline]
    fn set_game(self: Store, game: @Game) {
        GameStore::set(game, self.world)
    }

    #[inline]
    fn set_achievement(self: Store, achievement: @Achievement) {
        AchievementStore::set(achievement, self.world)
    }
}
