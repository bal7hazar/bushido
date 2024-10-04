use conquest::elements::quests::interface::{QuestTrait, Tile};

const CONQUESTS_REQUIRED: u8 = 3;

impl Conqueror of QuestTrait {
    #[inline]
    fn identifier() -> felt252 {
        'CONQUEROR'
    }

    #[inline]
    fn points() -> u16 {
        50
    }

    #[inline]
    fn title() -> ByteArray {
        "Conqueror"
    }

    #[inline]
    fn description() -> ByteArray {
        "Conquer 3 tiles"
    }

    #[inline]
    fn image_uri() -> ByteArray {
        "https://static.wikia.nocookie.net/humankind_gamepedia_en/images/e/ed/Conquest.png/revision/latest?cb=20210107072900"
    }

    #[inline]
    fn completion(ref tiles: Array<Tile>, player_id: felt252) -> (u8, u8) {
        let mut conquests: u8 = 0;

        loop {
            match tiles.pop_front() {
                Option::Some(tile) => { if tile.player_id != player_id {
                    conquests += 1;
                } },
                Option::None => { break (conquests, CONQUESTS_REQUIRED); }
            }
        }
    }
}
