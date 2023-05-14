import { Address, BigInt, store, crypto, ByteArray } from "@graphprotocol/graph-ts";
import {
  DeleteLend as DeleteLendEvent,
  DeleteRent as DeleteRentEvent,
  Lend as LendEvent,
  Rent as RentEvent
} from "../generated/marketplace/marketplace"
import { Lend, Rent } from "../generated/schema"

function getLendingID(collectionAddress: Address, tokenID: BigInt): ByteArray {
  // todo: test it and find a better way to do it
  return crypto.keccak256(ByteArray.fromHexString(collectionAddress.toHexString()).concat(ByteArray.fromBigInt(tokenID)));
}

export function handleLend(event: LendEvent): void {
  const lendingID = getLendingID(event.params.collectionAddress, event.params.tokenID)
  let entity = Lend.load(lendingID.toString())
  if (entity == null) {
    entity = new Lend(lendingID.toString())
  }

  entity.collectionAddress = event.params.collectionAddress
  entity.tokenID = event.params.tokenID
  entity.owner = event.params.owner
  entity.duration = event.params.duration
  entity.pricePerDay = event.params.pricePerDay

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRent(event: RentEvent): void {
  const lendingID = getLendingID(event.params.collectionAddress, event.params.tokenID)
  let entity = Rent.load(lendingID.toString())
  if (entity == null) {
    entity = new Rent(lendingID.toString())
  }
  let correspondingLend = Lend.load(lendingID.toString())

  entity.collectionAddress = event.params.collectionAddress
  entity.tokenID = event.params.tokenID
  entity.borrower = event.params.borrower
  entity.startingDate = event.params.startingDate
  if (correspondingLend != null) {
    entity.owner = correspondingLend.owner
  }

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  store.remove("Lend", lendingID.toString())
  entity.save()
}

export function handleDeleteLend(event: DeleteLendEvent): void {
  const lendingID = getLendingID(event.params.collectionAddress, event.params.tokenID)
  store.remove("Lend", lendingID.toString())
}

export function handleDeleteRent(event: DeleteRentEvent): void {
  const lendingID = getLendingID(event.params.collectionAddress, event.params.tokenID)
  store.remove("Rent", lendingID.toString())
}
