#[derive(IntrospectPacked, Copy, Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    id: felt252,
    name: felt252,
}

#[derive(IntrospectPacked, Copy, Drop, Serde)]
#[dojo::model]
pub struct Tile {
    #[key]
    x: i32,
    #[key]
    y: i32,
    player_id: felt252,
    time: u64,
}
