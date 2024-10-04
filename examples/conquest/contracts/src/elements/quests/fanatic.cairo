use conquest::elements::quests::interface::{QuestTrait, Tile};
use conquest::helpers::dater::Dater;

const CONSECUTIVE_MINUTES_REQUIRED: u8 = 3;

impl Fanatic of QuestTrait {
    #[inline]
    fn identifier() -> felt252 {
        'FANATIC'
    }

    #[inline]
    fn points() -> u16 {
        100
    }

    #[inline]
    fn title() -> ByteArray {
        "Fanatic"
    }

    #[inline]
    fn description() -> ByteArray {
        "Play 3 consecutive minutes"
    }

    #[inline]
    fn image_uri() -> ByteArray {
        "https://thumbs.dreamstime.com/z/video-game-fanatic-holding-controller-young-man-playing-games-169009566.jpg"
    }

    #[inline]
    fn completion(ref tiles: Array<Tile>, player_id: felt252) -> (u8, u8) {
        let mut consecutive_minutes: u8 = 0;
        let mut previous_minute: u64 = 0;

        loop {
            match tiles.pop_front() {
                Option::Some(tile) => {
                    let minute = Dater::minute_from(tile.time);
                    if tile.player_id == player_id
                        && (consecutive_minutes == 0 || minute == previous_minute + 1) {
                        consecutive_minutes += 1;
                        previous_minute = minute;
                    } else {
                        break (consecutive_minutes, CONSECUTIVE_MINUTES_REQUIRED);
                    };
                },
                Option::None => { break (consecutive_minutes, CONSECUTIVE_MINUTES_REQUIRED); }
            }
        }
    }
}
