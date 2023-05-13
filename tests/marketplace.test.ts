import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { DeleteLend } from "../generated/schema"
import { DeleteLend as DeleteLendEvent } from "../generated/marketplace/marketplace"
import { handleDeleteLend } from "../src/marketplace"
import { createDeleteLendEvent } from "./marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let collectionAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenID = BigInt.fromI32(234)
    let newDeleteLendEvent = createDeleteLendEvent(collectionAddress, tokenID)
    handleDeleteLend(newDeleteLendEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DeleteLend created and stored", () => {
    assert.entityCount("DeleteLend", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DeleteLend",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "collectionAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DeleteLend",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenID",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
