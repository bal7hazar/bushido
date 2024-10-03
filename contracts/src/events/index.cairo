#[derive(Introspect, Clone, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCreation {
    #[key]
    world_id: felt252,
    #[key]
    namespace: felt252,
    #[key]
    id: felt252,
    points: u16,
    title: ByteArray,
    description: ByteArray,
    image_uri: ByteArray,
}

#[derive(IntrospectPacked, Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCompletion {
    #[key]
    world_id: felt252,
    #[key]
    namespace: felt252,
    #[key]
    id: felt252,
    #[key]
    player_id: felt252,
    progress: u8,
}
