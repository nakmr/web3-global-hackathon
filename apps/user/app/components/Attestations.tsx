"use client"

import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { parseAttestation, Attestation } from "../common/types/Attestation"

export default async function getAttestation() {
  const [attestasion, setAttestasion] = useState<Attestation | null>(null)
  const [newAttestationUid, setNewAttestationUid] = useState<string | null>(null)

  const provider = new ethers.BrowserProvider((window as any).ethereum)
  const EASContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
  const eas = new EAS(EASContractAddress)
  const uid = "0xd0d735cc16e5cd43986155b6cfae23b793776bc7c42d5f18f2c8cef7843bb558"

  useEffect(() => {
    const fetchAttestation = async () => {
      eas.connect(provider)
      const attestation = await eas.getAttestation(uid)

      setAttestasion(parseAttestation(attestation.toString()))
    }

    fetchAttestation()
  }, [])

  const createAttestation = async () => {
    const signer = await provider.getSigner()
    eas.connect(signer)
    const schemaEncoder = new SchemaEncoder("bool testSchema4321")
    const encodedData = schemaEncoder.encodeData([
      { name: "testSchema4321", value: true, type: "bool" },
    ])

    const schemaUid = "0x242338cec90522a241d88dd7a35c0bec8032b62a02f823716953c46695d4251f"

    const tx = await eas.attest({
      schema: schemaUid,
      data: {
        recipient: "0x888384990dAdd6c2dC6A0D9357805deBFE23D673",
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    })

    const newAttestationUid = await tx.wait()

    console.log("new attestation uid: ", newAttestationUid)
    setNewAttestationUid(newAttestationUid)
  }

  function hexToUtf8String(hex: string): string {
    // Remove the "0x" prefix if it exists
    hex = hex.startsWith("0x") ? hex.slice(2) : hex

    let result = ""
    let tempStr = ""

    for (let i = 0; i < hex.length; i += 2) {
      const byteValue = parseInt(hex.substring(i, i + 2), 16)

      // If we encounter a null byte, we append the accumulated string to the result if it's not empty
      if (byteValue === 0) {
        if (tempStr.length > 0) {
          result += tempStr + " " // add a space if you expect the null byte to be a separator
          tempStr = "" // reset the temporary string
        }
      } else {
        tempStr += String.fromCharCode(byteValue)
      }
    }

    // If there's any remaining non-null part, append it to the result
    if (tempStr.length > 0) {
      result += tempStr
    }

    return result
  }

  return (
    <div>
      {attestasion && (
        <div>
          <p>UID: {attestasion.uid}</p>
          <p>Schema: {attestasion.schema}</p>
          <p>Recipient: {attestasion.recipient}</p>
          <p>Attester: {attestasion.attester}</p>
          <p>Time: {new Date(attestasion.time * 1000).toLocaleString()}</p>
          <p>
            Expiration Time:{" "}
            {attestasion.expirationTime
              ? new Date(attestasion.expirationTime * 1000).toLocaleString()
              : "None"}
          </p>
          <p>
            Revocation Time:{" "}
            {attestasion.revocationTime
              ? new Date(attestasion.revocationTime * 1000).toLocaleString()
              : "None"}
          </p>
          <p>Revocable: {attestasion.revocable ? "Yes" : "No"}</p>
          {/* `data`フィールドはバイト形式なので、表示するには変換が必要になるかもしれません */}
          <p>Data: {hexToUtf8String(attestasion.data)}</p>
        </div>
      )}
      <button onClick={() => createAttestation()}>[[Create Attestation]]</button>
      <p>{newAttestationUid ? `new attestation UID is ${newAttestationUid}` : ""}</p>
    </div>
  )
}
