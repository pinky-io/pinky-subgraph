import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DeleteLend,
  DeleteRent,
  Lend,
  Rent
} from "../generated/marketplace/marketplace"

export function createDeleteLendEvent(
  collectionAddress: Address,
  tokenID: BigInt
): DeleteLend {
  let deleteLendEvent = changetype<DeleteLend>(newMockEvent())

  deleteLendEvent.parameters = new Array()

  deleteLendEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  deleteLendEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )

  return deleteLendEvent
}

export function createDeleteRentEvent(
  collectionAddress: Address,
  tokenID: BigInt
): DeleteRent {
  let deleteRentEvent = changetype<DeleteRent>(newMockEvent())

  deleteRentEvent.parameters = new Array()

  deleteRentEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  deleteRentEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )

  return deleteRentEvent
}

export function createLendEvent(
  collectionAddress: Address,
  tokenID: BigInt,
  owner: Address,
  duration: BigInt,
  pricePerDay: BigInt
): Lend {
  let lendEvent = changetype<Lend>(newMockEvent())

  lendEvent.parameters = new Array()

  lendEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  lendEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  lendEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  lendEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  lendEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerDay",
      ethereum.Value.fromUnsignedBigInt(pricePerDay)
    )
  )

  return lendEvent
}

export function createRentEvent(
  collectionAddress: Address,
  tokenID: BigInt,
  borrower: Address,
  startingDate: BigInt
): Rent {
  let rentEvent = changetype<Rent>(newMockEvent())

  rentEvent.parameters = new Array()

  rentEvent.parameters.push(
    new ethereum.EventParam(
      "collectionAddress",
      ethereum.Value.fromAddress(collectionAddress)
    )
  )
  rentEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  rentEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  rentEvent.parameters.push(
    new ethereum.EventParam(
      "startingDate",
      ethereum.Value.fromUnsignedBigInt(startingDate)
    )
  )

  return rentEvent
}
