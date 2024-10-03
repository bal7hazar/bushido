#[starknet::component]
mod PlayableComponent {
    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp};

    // Dojo imports

    use dojo::world::IWorldDispatcher;
    use dojo::world::IWorldDispatcherTrait;

    // Internal imports

    use conquest::store::{Store, StoreTrait};
    use conquest::models::player::{Player, PlayerTrait, PlayerAssert};
    use conquest::models::tile::{Tile, TileTrait, TileAssert};

    // Storage

    #[storage]
    struct Storage {}

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn conquest(
            self: @ComponentState<TContractState>, world: IWorldDispatcher, x: i32, y: i32
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let mut player = store.get_player(player_id);
            player.assert_is_created();

            // [Check] Tile is not owned
            let mut tile: Tile = store.get_tile(x, y);
            tile.assert_not_owned(player_id);

            // [Effect] Own tile
            let time = get_block_timestamp();
            tile.own(player_id, time);

            // [Effect] Store tile
            store.set_tile(tile);
        }
    }
}
