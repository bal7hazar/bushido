#[starknet::component]
mod QuestableComponent {
    // Starknet imports

    use starknet::info::{get_caller_address, get_contract_address, get_block_timestamp};

    // Dojo imports

    use dojo::world::IWorldDispatcher;
    use dojo::contract::{IContract, IContractDispatcher, IContractDispatcherTrait};

    // External imports

    use bushido::components::achievable::AchievableComponent;
    use bushido::components::achievable::AchievableComponent::InternalImpl as AchievableInternalImpl;

    // Internal imports

    use conquest::store::{Store, StoreTrait};
    use conquest::models::player::{Player, PlayerTrait, PlayerAssert};
    use conquest::models::tile::{Tile, TileTrait, TileAssert};
    use conquest::types::quest::{Quest, QuestTrait, QUEST_COUNT};

    // Storage

    #[storage]
    struct Storage {}

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[generate_trait]
    impl InternalImpl<
        TContractState,
        +HasComponent<TContractState>,
        +IContract<TContractState>,
        impl InternalImpl: AchievableComponent::HasComponent<TContractState>,
    > of InternalTrait<TContractState> {
        fn initialize(self: @ComponentState<TContractState>, world: IWorldDispatcher,) {
            // [Event] Emit quest creation events
            let contract_address = get_contract_address();
            let namespace = IContractDispatcher { contract_address }.namespace_hash();
            let mut achievable = get_dep_component!(self, InternalImpl);
            let mut quest_id: u8 = QUEST_COUNT;
            while quest_id > 0 {
                let quest: Quest = quest_id.into();
                achievable
                    .create_achievement(
                        world,
                        world.contract_address.into(),
                        namespace,
                        achievement_id: quest.identifier(),
                        points: quest.points(),
                        title: quest.title(),
                        description: quest.description(),
                        image_uri: quest.image_uri(),
                    );
                quest_id -= 1;
            }
        }

        fn verify(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            quest: Quest,
            ref positions: Array<(i32, i32)>,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let mut player = store.get_player(player_id);
            player.assert_is_created();

            // [Compute] Tiles
            let mut tiles: Array<Tile> = array![];
            while let Option::Some((x, y)) = positions.pop_front() {
                let tile = store.get_tile(x, y);
                tiles.append(tile);
            };

            // [Effect] Verify quest completion
            let (num, den) = quest.completion(ref tiles, player_id);
            let progress: u8 = (num * 100) / den;

            // [Event] Emit quest completion event
            let contract_address = get_contract_address();
            let namespace = IContractDispatcher { contract_address }.namespace_hash();
            let mut achievable = get_dep_component!(self, InternalImpl);
            achievable
                .update_achievement_progress(
                    world,
                    world.contract_address.into(),
                    namespace,
                    achievement_id: quest.identifier(),
                    player_id: player_id,
                    progress: progress,
                );
        }
    }
}
