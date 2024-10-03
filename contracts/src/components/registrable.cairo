#[starknet::component]
mod RegistrableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::get_caller_address;

    // Dojo imports

    use dojo::world::IWorldDispatcher;

    // Internal imports

    use bushido::store::{Store, StoreTrait};
    use bushido::models::game::{Game, GameTrait, GameAssert};
    use bushido::models::achievement::{Achievement, AchievementTrait, AchievementAssert};

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
        fn register_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_id: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game does not exist
            let game = store.get_game(world_id, namespace);
            game.assert_does_not_exist();

            // [Effect] Create game
            let game = GameTrait::new(world_id, namespace, name, description, torii_url, image_uri);

            // [Effect] Store game
            store.set_game(@game);
        }

        fn update_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_id: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_id, namespace);
            game.assert_does_exist();

            // [Effect] Update game
            game.update(name, description, torii_url, image_uri);

            // [Effect] Update game
            store.set_game(@game);
        }

        fn register_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_id: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_id, namespace);
            game.assert_does_exist();

            // [Check] Achievement does not exist
            let achievement = store.get_achievement(world_id, namespace, achievement_id);
            achievement.assert_does_not_exist();

            // [Effect] Create achievement
            let achievement = AchievementTrait::new(world_id, namespace, achievement_id, points);

            // [Effect] Add achievement to game
            game.add(achievement.points);

            // [Effect] Store entities
            store.set_achievement(@achievement);
            store.set_game(@game);
        }

        fn update_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_id: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_id, namespace);
            game.assert_does_exist();

            // [Check] Achievement exists
            let mut achievement = store.get_achievement(world_id, namespace, achievement_id);
            achievement.assert_does_exist();

            // [Effect] Update achievement and game
            game.remove(achievement.points);
            achievement.set_points(points);
            game.add(achievement.points);

            // [Effect] Update entities
            store.set_achievement(@achievement);
            store.set_game(@game);
        }
    }
}
