import {
  DeleteLend as DeleteLendEvent,
  DeleteRent as DeleteRentEvent,
  Lend as LendEvent,
  Rent as RentEvent
} from "../generated/marketplace/marketplace"
import { DeleteLend, DeleteRent, Lend, Rent } from "../generated/schema"

export function handleDeleteLend(event: DeleteLendEvent): void {
  let entity = new DeleteLend(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.collectionAddress = event.params.collectionAddress
  entity.tokenID = event.params.tokenID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeleteRent(event: DeleteRentEvent): void {
  let entity = new DeleteRent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.collectionAddress = event.params.collectionAddress
  entity.tokenID = event.params.tokenID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLend(event: LendEvent): void {
  let entity = new Lend(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
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
  let entity = new Rent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.collectionAddress = event.params.collectionAddress
  entity.tokenID = event.params.tokenID
  entity.borrower = event.params.borrower
  entity.startingDate = event.params.startingDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
