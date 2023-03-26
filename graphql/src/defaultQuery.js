export default `######################################################################
#
#  Welcome to the NexaShell GraphiQL
#
#  Application Builders should make great use of this tool for:
#    ✔ Running on-chain Nexa data queries
#    ✔ Publishing transactions to the Nexa blockchain
#    ✔ Accessing data from Meta (extended) networks
#
#  Sample queries from each (of 9) data categories shown below:
#
#        Account:   Request transaction histories
#                   and full balance details.
#
#        Address:   Request transaction histories
#                   and full balance details.
#
#          Block:   Request confirmation and transaction
#                   details.
#
#             ID:   Request profile & session info from a "public"
#                   Nexa ID authentication service.
#
#           Meta:   Request information from Meta (extended)
#                   on-chain data.
#
#          Owner:   Request all available on-chain details for
#                   a specific Owner ID.
#
#         Script:   Request on-chain metadata details stored
#                   in a transaction's 'OP_RETURN' script area.
#
#          Token:   Request asset registration/genesis information
#                   and activity details.
#
#    Transaction:   Request full on-chain activity details,
#                   including block confirmation.
#
######################################################################

{
  # Example Block query
  block(height: [0, 1337, 227572]) {
    height
    hash
    size
    txcount
    time
    mediantime
    nonce
    bits
    difficulty
  }
}
`
