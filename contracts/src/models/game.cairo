use bushido::models::index::Game;
use bushido::constants;

pub mod errors {
    pub const GAME_INVALID_WORLD: felt252 = 'Game: invalid world';
    pub const GAME_INVALID_NAMESPACE: felt252 = 'Game: invalid namespace';
    pub const GAME_INVALID_NAME: felt252 = 'Game: invalid name';
    pub const GAME_INVALID_DESCRIPTION: felt252 = 'Game: invalid description';
    pub const GAME_INVALID_TORII_URL: felt252 = 'Game: invalid torii url';
    pub const GAME_INVALID_POINTS: felt252 = 'Game: cannot exceed 1000';
    pub const GAME_NOT_EXIST: felt252 = 'Game: does not exist';
    pub const GAME_ALREADY_EXISTS: felt252 = 'Game: already exists';
}

#[generate_trait]
impl GameImpl of GameTrait {
    #[inline]
    fn new(
        world_id: felt252,
        namespace: felt252,
        name: ByteArray,
        description: ByteArray,
        torii_url: ByteArray,
        image_uri: ByteArray,
    ) -> Game {
        // [Check] Inputs
        GameAssert::assert_valid_world(world_id);
        GameAssert::assert_valid_namespace(namespace);
        GameAssert::assert_valid_name(@name);
        GameAssert::assert_valid_description(@description);
        GameAssert::assert_valid_torii_url(@torii_url);
        // [Return] Game
        Game {
            world_id,
            namespace,
            total_points: 0,
            name,
            description,
            whitelisted: false,
            torii_url,
            image_uri,
        }
    }

    #[inline]
    fn add(ref self: Game, points: u16) {
        // [Check] Inputs
        let total_points = self.total_points + points;
        GameAssert::assert_valid_points(total_points);
        // [Update] Points
        self.total_points = total_points;
    }

    #[inline]
    fn remove(ref self: Game, points: u16) {
        self.total_points -= points;
    }

    #[inline]
    fn update(
        ref self: Game,
        name: ByteArray,
        description: ByteArray,
        torii_url: ByteArray,
        image_uri: ByteArray
    ) {
        // [Check] Inputs
        GameAssert::assert_valid_name(@name);
        GameAssert::assert_valid_description(@description);
        GameAssert::assert_valid_torii_url(@torii_url);
        // [Update] Game
        self.name = name;
        self.description = description;
        self.torii_url = torii_url;
        self.image_uri = image_uri;
    }

    #[inline]
    fn whitelist(ref self: Game) {
        self.whitelisted = true;
    }

    #[inline]
    fn blacklist(ref self: Game) {
        self.whitelisted = false;
    }
}

#[generate_trait]
impl GameAssert of AssertTrait {
    #[inline]
    fn assert_does_not_exist(self: @Game) {
        assert(self.name == @"", errors::GAME_ALREADY_EXISTS);
    }

    #[inline]
    fn assert_does_exist(self: @Game) {
        assert(self.name != @"", errors::GAME_NOT_EXIST);
    }

    #[inline]
    fn assert_valid_world(world: felt252) {
        assert(world != 0, errors::GAME_INVALID_WORLD);
    }

    #[inline]
    fn assert_valid_namespace(namespace: felt252) {
        assert(namespace != 0, errors::GAME_INVALID_NAMESPACE);
    }

    #[inline]
    fn assert_valid_name(name: @ByteArray) {
        assert(name.len() > 0, errors::GAME_INVALID_NAME);
    }

    #[inline]
    fn assert_valid_description(description: @ByteArray) {
        assert(description.len() > 0, errors::GAME_INVALID_DESCRIPTION);
    }

    #[inline]
    fn assert_valid_torii_url(torii_url: @ByteArray) {
        assert(torii_url.len() > 0, errors::GAME_INVALID_TORII_URL);
    }

    #[inline]
    fn assert_valid_points(points: u16) {
        assert(points <= constants::MAX_GAME_POINTS, errors::GAME_INVALID_POINTS);
    }
}
