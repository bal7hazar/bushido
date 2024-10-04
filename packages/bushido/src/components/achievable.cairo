#[starknet::component]
mod AchievableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp};

    // Dojo imports

    use dojo::world::IWorldDispatcher;

    // Internal imports

    use bushido::store::{Store, StoreTrait};

    // Errors

    mod errors {}

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
        fn create_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_id: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
            title: ByteArray,
            description: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement creation
            let time: u64 = get_block_timestamp();
            store
                .emit_achievement_creation(
                    world_id, namespace, achievement_id, points, title, description, image_uri, time
                );
        }

        fn update_achievement_progress(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_id: felt252,
            namespace: felt252,
            achievement_id: felt252,
            player_id: felt252,
            progress: u8,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement completion
            let time: u64 = get_block_timestamp();
            store
                .emit_achievement_completion(
                    world_id, namespace, achievement_id, player_id, progress, time
                );
        }
    }
}
