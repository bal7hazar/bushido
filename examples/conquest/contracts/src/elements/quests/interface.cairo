use conquest::models::tile::Tile;

trait QuestTrait {
    fn identifier() -> felt252;
    fn points() -> u16;
    fn title() -> ByteArray;
    fn description() -> ByteArray;
    fn image_uri() -> ByteArray;
    fn completion(ref tiles: Array<Tile>, player_id: felt252) -> (u8, u8);
}
