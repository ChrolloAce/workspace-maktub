import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-gcm'

function getKey(): Buffer {
  const keyHex = process.env.CREDENTIALS_ENCRYPTION_KEY
  if (!keyHex) {
    throw new Error('CREDENTIALS_ENCRYPTION_KEY environment variable is required')
  }
  if (keyHex.length !== 64) {
    throw new Error('CREDENTIALS_ENCRYPTION_KEY must be 64 characters (32 bytes) hex string')
  }
  return Buffer.from(keyHex, 'hex')
}

export function encrypt(text: string): string {
  if (!text) return ''
  
  const key = getKey()
  const iv = randomBytes(12) // 96-bit IV for GCM
  const cipher = createCipheriv(ALGORITHM, key, iv)
  
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final()
  ])
  
  const authTag = cipher.getAuthTag()
  
  // Combine IV + AuthTag + Encrypted data
  const combined = Buffer.concat([iv, authTag, encrypted])
  return combined.toString('base64')
}

export function decrypt(encryptedData: string): string {
  if (!encryptedData) return ''
  
  const key = getKey()
  const combined = Buffer.from(encryptedData, 'base64')
  
  // Extract components
  const iv = combined.subarray(0, 12)
  const authTag = combined.subarray(12, 28)
  const encrypted = combined.subarray(28)
  
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)
  
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ])
  
  return decrypted.toString('utf8')
}

export function maskSecret(secret: string): string {
  if (!secret || secret.length < 4) return '••••'
  return secret.slice(0, 2) + '••••' + secret.slice(-2)
}
