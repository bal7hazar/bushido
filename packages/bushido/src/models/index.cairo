#[derive(Clone, Drop, Serde)]
#[dojo::model]
pub struct Game {
    #[key]
    world_id: felt252,
    #[key]
    namespace: felt252,
    total_points: u16,
    name: ByteArray,
    description: ByteArray,
    whitelisted: bool,
    torii_url: ByteArray,
    image_uri: ByteArray,
}

#[derive(Introspect, Copy, Drop, Serde)]
#[dojo::model]
pub struct Achievement {
    #[key]
    world_id: felt252,
    #[key]
    namespace: felt252,
    #[key]
    id: felt252,
    points: u16,
    whitelisted: bool,
}
