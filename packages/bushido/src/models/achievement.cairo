use bushido::models::index::Achievement;
use bushido::constants;

pub mod errors {
    pub const ACHIEVEMENT_ALREADY_EXISTS: felt252 = 'Achievement: already exists';
    pub const ACHIEVEMENT_NOT_EXIST: felt252 = 'Achievement: does not exist';
    pub const ACHIEVEMENT_INVALID_WORLD: felt252 = 'Achievement: invalid world';
    pub const ACHIEVEMENT_INVALID_NAMESPACE: felt252 = 'Achievement: invalid namespace';
    pub const ACHIEVEMENT_INVALID_ACHIEVEMENT: felt252 = 'Achievement: invalid id';
    pub const ACHIEVEMENT_INVALID_POINTS: felt252 = 'Achievement: cannot exceed 100';
}

#[generate_trait]
impl AchievementImpl of AchievementTrait {
    #[inline]
    fn new(
        world_id: felt252, namespace: felt252, achievement_id: felt252, points: u16
    ) -> Achievement {
        // [Check] Inputs
        AchievementAssert::assert_valid_world(world_id);
        AchievementAssert::assert_valid_namespace(namespace);
        AchievementAssert::assert_valid_achievement(achievement_id);
        AchievementAssert::assert_valid_points(points);
        // [Return] Achievement
        Achievement { world_id, namespace, id: achievement_id, points, whitelisted: false, }
    }

    #[inline]
    fn whitelist(ref self: Achievement) {
        self.whitelisted = true;
    }

    #[inline]
    fn blacklist(ref self: Achievement) {
        self.whitelisted = false;
    }

    #[inline]
    fn set_points(ref self: Achievement, points: u16) {
        // [Check] Inputs
        AchievementAssert::assert_valid_points(points);
        // [Update] Points
        self.points = points;
    }
}

#[generate_trait]
impl AchievementAssert of AssertTrait {
    #[inline]
    fn assert_does_not_exist(self: Achievement) {
        assert(self.points == 0, errors::ACHIEVEMENT_ALREADY_EXISTS);
    }

    #[inline]
    fn assert_does_exist(self: Achievement) {
        assert(self.points != 0, errors::ACHIEVEMENT_NOT_EXIST);
    }

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
    fn assert_valid_points(points: u16) {
        assert(points <= constants::MAX_ACHIEVEMENT_POINTS, errors::ACHIEVEMENT_INVALID_POINTS);
    }
}
