//! Store struct and component management methods.

// Starknet imports

use starknet::SyscallResultTrait;

// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Models imports

use bushido::models::index::{GameStore, AchievementStore};
use bushido::models::game::Game;
use bushido::models::achievement::Achievement;

// Events imports

use bushido::events::achievement_creation::{AchievementCreation, AchievementCreationTrait};
use bushido::events::achievement_completion::{AchievementCompletion, AchievementCompletionTrait};

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

    #[inline]
    fn emit_achievement_creation(
        self: Store,
        world_id: felt252,
        namespace: felt252,
        achievement_id: felt252,
        points: u16,
        title: ByteArray,
        description: ByteArray,
        image_uri: ByteArray
    ) {
        let _event: AchievementCreation = AchievementCreationTrait::new(
            world_id, namespace, achievement_id, points, title, description, image_uri
        );
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_achievement_completion(
        self: Store,
        world_id: felt252,
        namespace: felt252,
        achievement_id: felt252,
        player_id: felt252,
        progress: u8,
    ) {
        let _event: AchievementCompletion = AchievementCompletionTrait::new(
            world_id, namespace, achievement_id, player_id, progress
        );
        emit!(self.world, (_event,));
    }
}
