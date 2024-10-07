use conquest::elements::quests::interface::{QuestTrait, Tile};
use conquest::helpers::dater::Dater;

const CONSECUTIVE_MINUTES_REQUIRED: u16 = 3;

impl Squire of QuestTrait {
    #[inline]
    fn identifier() -> felt252 {
        'SQUIRE'
    }

    #[inline]
    fn points() -> u16 {
        20
    }

    #[inline]
    fn title() -> ByteArray {
        "Squire"
    }

    #[inline]
    fn description() -> ByteArray {
        "Signup to the game"
    }

    #[inline]
    fn image_uri() -> ByteArray {
        "https://storage.googleapis.com/pod_public/1300/177060.jpg"
    }

    #[inline]
    fn completion(ref tiles: Array<Tile>, player_id: felt252) -> (u16, u16) {
        (0, 100)
    }
}
