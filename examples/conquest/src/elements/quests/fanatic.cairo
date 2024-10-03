use conquest::elements::quests::interface::{QuestTrait, Tile};
use conquest::helpers::dater::Dater;

impl Fanatic of QuestTrait {
    #[inline]
    fn title() -> ByteArray {
        "Pilgrim"
    }

    #[inline]
    fn description() -> ByteArray {
        "Play 3 consecutive days"
    }

    #[inline]
    fn verify(ref tiles: Array<Tile>, player_id: felt252) -> bool {
        let mut consecutive_days = 0;
        let mut previous_day = 0;

        loop {
            match tiles.pop_front() {
                Option::Some(tile) => {
                    let day = Dater::day_from(tile.time);
                    if tile.player_id == player_id
                        && (consecutive_days == 0 || day == previous_day + 1) {
                        consecutive_days += 1;
                        previous_day = day;
                    } else {
                        break false;
                    };
                },
                Option::None => { break true; }
            }
        }
    }
}
