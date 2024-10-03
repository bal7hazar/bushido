use conquest::elements::quests;
use conquest::models::tile::Tile;

#[derive(Copy, Drop)]
enum Quest {
    None,
    Conqueror,
    Fanatic,
}

#[generate_trait]
impl QuestImpl of QuestTrait {
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
    fn verify(self: Quest, ref tiles: Array<Tile>, player_id: felt252) -> bool {
        match self {
            Quest::None => false,
            Quest::Conqueror => quests::conqueror::Conqueror::verify(ref tiles, player_id),
            Quest::Fanatic => quests::fanatic::Fanatic::verify(ref tiles, player_id),
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

