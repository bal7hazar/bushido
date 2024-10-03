use conquest::models::tile::Tile;

trait QuestTrait {
    fn title() -> ByteArray;
    fn description() -> ByteArray;
    fn verify(ref tiles: Array<Tile>, player_id: felt252) -> bool;
}
