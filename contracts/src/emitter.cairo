// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Starknet imports

use starknet::SyscallResultTrait;

// Internal imports

use bushido::events::achievement_creation::{AchievementCreation, AchievementCreationTrait};
use bushido::events::achievement_completion::{AchievementCompletion, AchievementCompletionTrait};

// Structs

#[derive(Copy, Drop)]
struct Emitter {
    world: IWorldDispatcher,
}

// Implementations

#[generate_trait]
impl EmitterImpl of EmitterTrait {
    #[inline]
    fn new(world: IWorldDispatcher) -> Emitter {
        Emitter { world: world }
    }

    #[inline]
    fn emit_achievement_creation(
        self: Emitter,
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
        self: Emitter,
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
