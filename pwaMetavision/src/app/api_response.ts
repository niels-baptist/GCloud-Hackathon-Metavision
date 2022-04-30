export default interface ApiResponse {
    results: [
        co2e: number,
        co2e_unit: string,
        co2e_calculation_method: string,
        co2e_calculation_origin: string,
        emission_factor: any,
        constituent_gases: any,
    ]
}