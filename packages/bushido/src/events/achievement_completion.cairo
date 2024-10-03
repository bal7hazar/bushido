// Internal imports

use bushido::events::index::AchievementCompletion;
use bushido::constants;

// Errors

pub mod errors {
    pub const ACHIEVEMENT_INVALID_WORLD: felt252 = 'Achievement: invalid world';
    pub const ACHIEVEMENT_INVALID_NAMESPACE: felt252 = 'Achievement: invalid namespace';
    pub const ACHIEVEMENT_INVALID_ACHIEVEMENT: felt252 = 'Achievement: invalid id';
    pub const ACHIEVEMENT_INVALID_PROGRESS: felt252 = 'Achievement: invalid progress';
}

// Implementations

#[generate_trait]
impl AchievementCompletionImpl of AchievementCompletionTrait {
    #[inline]
    fn new(
        world_id: felt252,
        namespace: felt252,
        achievement_id: felt252,
        player_id: felt252,
        progress: u8,
    ) -> AchievementCompletion {
        // [Check] Inputs
        AchievementCompletionAssert::assert_valid_world(world_id);
        AchievementCompletionAssert::assert_valid_namespace(namespace);
        AchievementCompletionAssert::assert_valid_achievement(achievement_id);
        AchievementCompletionAssert::assert_valid_progress(progress);
        // [Return] Achievement
        AchievementCompletion { world_id, namespace, id: achievement_id, player_id, progress }
    }
}

#[generate_trait]
impl AchievementCompletionAssert of AssertTrait {
    #[inline]
    fn assert_valid_world(world: felt252) {
        assert(world != 0, errors::ACHIEVEMENT_INVALID_WORLD);
    }

    #[inline]
    fn assert_valid_namespace(namespace: felt252) {
        assert(namespace != 0, errors::ACHIEVEMENT_INVALID_NAMESPACE);
    }

    #[inline]
    fn assert_valid_achievement(achivement_id: felt252) {
        assert(achivement_id != 0, errors::ACHIEVEMENT_INVALID_ACHIEVEMENT);
    }

    #[inline]
    fn assert_valid_progress(progress: u8) {
        assert(
            progress <= constants::MAX_ACHIEVEMENT_PROGRESS, errors::ACHIEVEMENT_INVALID_PROGRESS
        );
    }
}
