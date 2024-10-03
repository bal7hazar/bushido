use conquest::elements::quests::interface::{QuestTrait, Tile};

impl Conqueror of QuestTrait {
    #[inline]
    fn title() -> ByteArray {
        "Conqueror"
    }

    #[inline]
    fn description() -> ByteArray {
        "Conquer 3 tiles"
    }

    #[inline]
    fn verify(ref tiles: Array<Tile>, player_id: felt252) -> bool {
        loop {
            match tiles.pop_front() {
                Option::Some(tile) => { if tile.player_id != player_id {
                    break false;
                } },
                Option::None => { break true; }
            }
        }
    }
}
