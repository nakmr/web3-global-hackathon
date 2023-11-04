export interface Attestation {
  uid: string
  schema: string
  refUID?: string
  time: number
  expirationTime: number
  revocationTime: number
  recipient: string
  attester: string
  revocable: boolean
  data: string
}

export function parseAttestation(rawData: string): Attestation | null {
  const fields = rawData.split(",")
  if (fields.length < 10) {
    console.error("Invalid attestation data")
    return null
  }

  return {
    uid: fields[0],
    schema: fields[1],
    refUID: fields[2],
    time: parseInt(fields[3], 10),
    expirationTime: parseInt(fields[4], 10),
    revocationTime: parseInt(fields[5], 10),
    recipient: fields[6],
    attester: fields[7],
    revocable: fields[8] === "true",
    data: fields[9],
  }
}
