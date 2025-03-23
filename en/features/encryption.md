# Monibuca Encryption Plugin

This plugin provides functionality for encrypting video streams, supporting multiple encryption algorithms and using either static or dynamic keys.

## Configuration

Add the following configuration to config.yaml:

```yaml
crypto:
  isstatic: false      # Whether to use static key
  algo: "aes_ctr"      # Encryption algorithm: supports aes_ctr, xor_s, xor_c
  encryptLen: 1024     # Encryption byte length
  secret:
    key: "your key"    # Encryption key
    iv: "your iv"      # Encryption vector (only required for aes_ctr and xor_c)
  onpub:
    transform:
      .* : $0          # Which streams to encrypt, regular expression, here all streams
```

### Encryption Algorithm Description

1. `aes_ctr`: AES-CTR mode encryption
   - Key length requirement: 32 bytes
   - IV length requirement: 16 bytes

2. `xor_s`: Simple XOR encryption
   - Key length requirement: 32 bytes
   - No IV required

3. `xor_c`: Complex XOR encryption
   - Key length requirement: 32 bytes
   - IV length requirement: 16 bytes

## Key Retrieval

### API Interface

API interface for retrieving encryption keys:

```
GET /crypto?stream={streamPath}
```

Parameter description:
- stream: Stream path

Response example:
```text
{key}.{iv}
```

The returned key format is rawstd base64 encoded

### Key Generation Rules

1. Static Key Mode (isStatic: true)
   - Directly uses the key and iv from the configuration file

2. Dynamic Key Mode (isStatic: false)
   - key = md5(configured key + stream path)
   - iv = First 16 bytes of md5(stream path)

## Important Notes

1. Encryption only encrypts the key data portion of video frames, preserving NALU header information
2. When using dynamic keys, ensure a valid secret.key is set in the configuration file
3. When using AES-CTR or XOR-C algorithms, both key and iv must be configured
4. It's recommended to use dynamic key mode in production environments for enhanced security 