// Starknet imports

use starknet::ContractAddress;

// Dojo imports

use dojo::world::IWorldDispatcher;

// Interfaces

#[starknet::interface]
trait IActions<TContractState> {
    fn register_game(
        self: @TContractState,
        world_id: felt252,
        namespace: felt252,
        name: ByteArray,
        description: ByteArray,
        torii_url: ByteArray,
        image_uri: ByteArray
    );
    fn update_game(
        self: @TContractState,
        world_id: felt252,
        namespace: felt252,
        name: ByteArray,
        description: ByteArray,
        torii_url: ByteArray,
        image_uri: ByteArray
    );
    fn register_achievement(
        self: @TContractState,
        world_id: felt252,
        namespace: felt252,
        achievement_id: felt252,
        points: u16
    );
    fn update_achievement(
        self: @TContractState,
        world_id: felt252,
        namespace: felt252,
        achievement_id: felt252,
        points: u16
    );
}

// Contracts

#[dojo::contract]
mod Actions {
    // Component imports

    use bushido::components::registrable::RegistrableComponent;

    // Local imports

    use super::IActions;

    // Components

    component!(path: RegistrableComponent, storage: registrable, event: RegistrableEvent);
    impl RegistrableInternalImpl = RegistrableComponent::InternalImpl<ContractState>;

    // Storage

    #[storage]
    struct Storage {
        #[substorage(v0)]
        registrable: RegistrableComponent::Storage,
    }

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        RegistrableEvent: RegistrableComponent::Event,
    }

    // Constructor

    fn dojo_init(world: @IWorldDispatcher,) {}

    // Implementations

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn register_game(
            self: @ContractState,
            world_id: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            self
                .registrable
                .register_game(
                    self.world(), world_id, namespace, name, description, torii_url, image_uri
                )
        }

        fn update_game(
            self: @ContractState,
            world_id: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            self
                .registrable
                .update_game(
                    self.world(), world_id, namespace, name, description, torii_url, image_uri
                )
        }

        fn register_achievement(
            self: @ContractState,
            world_id: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            self
                .registrable
                .register_achievement(self.world(), world_id, namespace, achievement_id, points)
        }

        fn update_achievement(
            self: @ContractState,
            world_id: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            self
                .registrable
                .update_achievement(self.world(), world_id, namespace, achievement_id, points)
        }
    }
}
