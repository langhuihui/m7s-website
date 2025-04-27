# Route Forwarding

## Overview

ZeroBot provides a route forwarding feature similar to Nginx reverse proxy, but unlike traditional reverse proxies, it can only rewrite and forward routes within the same server, equivalent to internal route redirection. This feature is particularly useful for scenarios where you need to map old paths to new ones, or simplify complex URL structures.

## Configuration

The route forwarding feature is implemented through the `location` section in the `global` configuration. The configuration format is as follows:

```yaml
global:
  location:
    "regular expression pattern": "replacement target"
```

Where:
- Left side: A regular expression defining the URL path pattern to match
- Right side: The new path to replace with when a match is successful

## How It Works

When an HTTP request is received, ZeroBot executes the following steps:

1. Checks if any `location` rules are configured
2. In configuration order, checks if the request's URL path matches any `pattern`
3. If a match is found, replaces the matched part of the URL path with the corresponding `target`
4. Forwards the request with the modified URL path internally within the local server
5. Returns the processing result to the client

## Usage Examples

### Example 1: Simple Path Redirection

```yaml
global:
  location:
    "^/hdl/(.*)": "/flv/$1"
```

This configuration will redirect all requests starting with `/hdl/` to `/flv/`, while preserving the rest of the path.

For example:
- `/hdl/video123.html` → `/flv/video123.html`
- `/hdl/stream/live.mp4` → `/flv/stream/live.mp4`

### Example 2: Multiple Path Rules

```yaml
global:
  location:
    "^/api/v1/(.*)": "/api/v2/$1"
    "^/legacy/users/(.*)": "/users/$1"
```

This configuration first checks if the first rule matches, and if not, checks the second rule.

## Important Notes

- Route forwarding only happens internally within the server and does not send HTTP redirect responses to the client
- Regular expression matching and replacement follows Go language regular expression syntax
- Forwarded requests are still handled by the same server instance
- Rules are matched in the order they are configured, and once a match is found, subsequent rules are not checked

## Performance Considerations

While the route forwarding feature is very useful, having too many or overly complex forwarding rules may impact performance. It's recommended to use them only when necessary and keep the rules simple and clear.