# Monibuca Stream Alias Technical Implementation Documentation

## 1. Feature Overview

Stream Alias is an important feature in Monibuca that allows creating one or more aliases for existing streams, enabling the same stream to be accessed through different paths. This feature is particularly useful in the following scenarios:

- Creating short aliases for streams with long paths
- Dynamically modifying stream access paths
- Implementing stream redirection functionality

## 2. Core Data Structures

### 2.1 AliasStream Structure

```go
type AliasStream struct {
    *Publisher      // Inherits from Publisher
    AutoRemove bool // Whether to automatically remove
    StreamPath string // Original stream path
    Alias      string // Alias path
}
```

### 2.2 StreamAlias Message Structure

```protobuf
message StreamAlias {
    string streamPath = 1;  // Original stream path
    string alias = 2;       // Alias
    bool autoRemove = 3;    // Whether to automatically remove
    uint32 status = 4;      // Status
}
```

## 3. Core Functionality Implementation

### 3.1 Alias Creation and Modification

When calling the `SetStreamAlias` API to create or modify an alias, the system:

1. Validates and parses the target stream path
2. Checks if the target stream exists
3. Handles the following scenarios:
   - Modifying existing alias: Updates auto-remove flag and stream path
   - Creating new alias: Initializes new AliasStream structure
4. Handles subscriber transfer or wakes waiting subscribers

### 3.2 Publisher Startup Alias Handling

When a Publisher starts, the system:

1. Checks for aliases pointing to this Publisher
2. For each matching alias:
   - If alias Publisher is empty, sets it to the new Publisher
   - If alias already has a Publisher, transfers subscribers to the new Publisher
3. Wakes all subscribers waiting for this stream

### 3.3 Publisher Destruction Alias Handling

Publisher destruction process:

1. Checks if stopped due to being kicked out
2. Removes Publisher from Streams
3. Iterates through all aliases, for those pointing to this Publisher:
   - If auto-remove is set, deletes the alias
   - Otherwise, retains alias structure
4. Handles related subscribers

### 3.4 Subscriber Handling Mechanism

When a new subscription request arrives:

1. Checks for matching alias
2. If alias exists:
   - If alias Publisher exists: adds subscriber
   - If Publisher doesn't exist: triggers OnSubscribe event
3. If no alias exists:
   - Checks for matching regex alias
   - Checks if original stream exists
   - Adds subscriber or joins wait list based on conditions

## 4. API Interfaces

### 4.1 Set Alias

```http
POST /api/stream/alias
```

Request body:
```json
{
    "streamPath": "original stream path",
    "alias": "alias path",
    "autoRemove": false
}
```

### 4.2 Get Alias List

```http
GET /api/stream/alias
```

Response body:
```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "streamPath": "original stream path",
            "alias": "alias path",
            "autoRemove": false,
            "status": 1
        }
    ]
}
```

## 5. Status Descriptions

Alias status descriptions:
- 0: Initial state
- 1: Alias associated with Publisher
- 2: Original stream with same name exists

## 6. Best Practices

1. Using Auto-Remove (autoRemove)
   - Enable auto-remove when temporary stream redirection is needed
   - This ensures automatic alias cleanup when original stream ends

2. Alias Naming Recommendations
   - Use short, meaningful aliases
   - Avoid special characters
   - Use standardized path format

3. Performance Considerations
   - Alias mechanism uses efficient memory mapping
   - Maintains connection state during subscriber transfer
   - Supports dynamic modification without service restart

## 7. Important Notes

1. Alias Conflict Handling
   - System handles appropriately when created alias conflicts with existing stream path
   - Recommended to check for conflicts before creating aliases

2. Subscriber Behavior
   - Existing subscribers are transferred to new stream when alias is modified
   - Ensure clients can handle stream redirection

3. Resource Management
   - Clean up unnecessary aliases promptly
   - Use auto-remove feature appropriately
   - Monitor alias status to avoid resource leaks 