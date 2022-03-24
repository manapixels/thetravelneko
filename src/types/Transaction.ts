export interface TransactionType {
    block_height: number
    block_signed_at: string
    from_address: string
    from_address_label: string
    gas_spent: number
    log_events: {
       decoded: {
          name: string
          params: {
             name: string
             type: string
             indexed: boolean
             value: string
          }[]
       }
       sender_address: string
       sender_contract_decimals: number
       sender_contract_ticker_symbol: string
       sender_logo_url: string
    }[]
    successful: boolean
    to_address: string
    to_address_label: string
    tx_hash: string
    value: string
 }