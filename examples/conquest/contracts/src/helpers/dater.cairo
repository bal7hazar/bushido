#[generate_trait]
impl Dater of DateTrait {
    fn day_from(timestamp: u64) -> u8 {
        (timestamp / 86400).try_into().unwrap()
    }
}
