use conquest::elements::quests;
use conquest::models::tile::Tile;

// Constants

pub const QUEST_COUNT: u8 = 2;

#[derive(Copy, Drop)]
enum Quest {
    None,
    Conqueror,
    Fanatic,
}

#[generate_trait]
impl QuestImpl of QuestTrait {
    #[inline]
    fn identifier(self: Quest) -> felt252 {
        match self {
            Quest::None => 0,
            Quest::Conqueror => quests::conqueror::Conqueror::identifier(),
            Quest::Fanatic => quests::fanatic::Fanatic::identifier(),
        }
    }

    #[inline]
    fn points(self: Quest) -> u16 {
        match self {
            Quest::None => 0,
            Quest::Conqueror => quests::conqueror::Conqueror::points(),
            Quest::Fanatic => quests::fanatic::Fanatic::points(),
        }
    }

    #[inline]
    fn title(self: Quest) -> ByteArray {
        match self {
            Quest::None => "",
            Quest::Conqueror => quests::conqueror::Conqueror::title(),
            Quest::Fanatic => quests::fanatic::Fanatic::title(),
        }
    }

    #[inline]
    fn description(self: Quest) -> ByteArray {
        match self {
            Quest::None => "",
            Quest::Conqueror => quests::conqueror::Conqueror::description(),
            Quest::Fanatic => quests::fanatic::Fanatic::description(),
        }
    }

    #[inline]
    fn image_uri(self: Quest) -> ByteArray {
        match self {
            Quest::None => "",
            Quest::Conqueror => quests::conqueror::Conqueror::image_uri(),
            Quest::Fanatic => quests::fanatic::Fanatic::image_uri(),
        }
    }

    #[inline]
    fn completion(self: Quest, ref tiles: Array<Tile>, player_id: felt252) -> (u16, u16) {
        match self {
            Quest::None => (0, 100),
            Quest::Conqueror => quests::conqueror::Conqueror::completion(ref tiles, player_id),
            Quest::Fanatic => quests::fanatic::Fanatic::completion(ref tiles, player_id),
        }
    }
}

impl IntoQuestFelt252 of core::Into<Quest, felt252> {
    #[inline]
    fn into(self: Quest) -> felt252 {
        match self {
            Quest::None => 'NONE',
            Quest::Conqueror => 'CONQUEROR',
            Quest::Fanatic => 'FANATIC',
        }
    }
}

impl IntoQuestU8 of core::Into<Quest, u8> {
    #[inline]
    fn into(self: Quest) -> u8 {
        match self {
            Quest::None => 0,
            Quest::Conqueror => 1,
            Quest::Fanatic => 2,
        }
    }
}

impl IntoU8Quest of core::Into<u8, Quest> {
    #[inline]
    fn into(self: u8) -> Quest {
        let card: felt252 = self.into();
        match card {
            0 => Quest::None,
            1 => Quest::Conqueror,
            2 => Quest::Fanatic,
            _ => Quest::None,
        }
    }
}

impl QuestPrint of core::debug::PrintTrait<Quest> {
    #[inline]
    fn print(self: Quest) {
        let felt: felt252 = self.into();
        felt.print();
    }
}

